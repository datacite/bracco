import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';
import { A } from '@ember/array';

const stateList = {
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
};

export default Component.extend({
  currentUser: service(),
  store: service(),

  draft: true,
  registered: true,
  findable: true,

  stateList,
  state: null,

  repositoryPrefixes: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.setDefaultPrefix();
  },

  setDefaultPrefix() {
    let self = this;
    this.store
      .query('repository-prefix', {
        'repository-id': this.repository.id,
        sort: 'name',
        'page[size]': 25
      })
      .then(function (repositoryPrefixes) {
        if (typeof self.model.doi == 'undefined') {
          self.set('repositoryPrefixes', repositoryPrefixes);
        }

        let repositoryPrefix =
          repositoryPrefixes.length > 0 ? repositoryPrefixes.firstObject : null;
        self.model.set('prefix', repositoryPrefix.prefix.id);

        if (typeof self.model.doi == 'undefined') {
          self.generate();
        }
      })
      .catch(function (reason) {
        console.debug(reason);
        return [];
      });
  },
  async generate() {
    let self = this;
    let url = ENV.API_URL + '/dois/random?prefix=' + this.model.prefix;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.currentUser.jwt
        }
      });
      if (response.ok) {
        return response.json().then(function (data) {
          let suffix = data.dois[0].split('/', 2)[1];
          self.model.set('suffix', suffix);
          let doi = self.model.prefix + '/' + suffix;
          self.model.set('doi', doi);
          self.selectState(self.model.state);
          return suffix;
        });
      } else {
        console.debug(response);

        return null;
      }
    } catch (error) {
      console.debug(error);
    }
  },
  selectState(state) {
    this.set('state', state);
    this.model.set('state', state);
    this.setStates(state);
  },
  setStates(state) {
    if (state == '' || state == 'undetermined') {
      state = 'draft';
    }
    let states = [];
    states = stateList[state];
    A(states).forEach((item) => {
      this.set(item, false);
    });
  },

  actions: {
    selectPrefix(repositoryPrefix) {
      this.model.set('prefix', repositoryPrefix.prefix.id);
      this.model.set(
        'doi',
        repositoryPrefix.prefix.id + '/' + this.model.suffix
      );
      this.selectState(this.model.state);
    },
    selectSuffix(suffix) {
      this.model.set('suffix', suffix);
      this.model.set('doi', this.model.prefix + '/' + suffix);
    },
    generate() {
      this.generate();
    },
    refresh() {
      this.generate();
    },
    clear() {
      this.model.set('suffix', null);
      // this.$('input[type=text]:first').focus();
    },
    selectState(state) {
      this.selectState(state);
    }
  }
});
