// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
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

export default class DoiDoi extends Component {
  @service
  currentUser;

  @service
  store;

  draft = true;
  registered = true;
  findable = true;
  stateList = stateList;
  state = null;
  repositoryPrefixes = null;

  constructor() {
    super(...arguments);
  }

  init() {
    super.init(...arguments);

    this.setDefaultPrefix();
  }

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
          // Need .set - ???
          self.set('repositoryPrefixes', repositoryPrefixes);
        }
        let repositoryPrefix =
          repositoryPrefixes.length > 0
            ? repositoryPrefixes.firstObject
            : null;
        // Need .get - prefix is proxy
        self.model.prefix = repositoryPrefix.prefix.get('id');

        if (typeof self.model.doi == 'undefined') {
          self.generate();
        }
      })
      .catch(function (reason) {
        console.debug(reason);
        return [];
      });
  }

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
          self.model.suffix = suffix;
          let doi = self.model.prefix + '/' + suffix;
          self.model.doi = doi;
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
  }

  selectState(state) 
  {
    // Need .set - ???
    this.set('state', state);
    this.model.state = state;
    this.setStates(state);
  }
  
  setStates(state) {
    if (state == '' || state == 'undetermined') {
      state = 'draft';
    }
    let states = [];
    states = stateList[state];
    A(states).forEach((item) => {
      // Need .set - ???
      this.set(item, false);
    });
  }

  @action
  selectPrefix(repositoryPrefix) {
    // Need .get - ???
    this.model.prefix = repositoryPrefix.prefix.get('id');
    // Need .get - ???
    this.model.doi = repositoryPrefix.prefix.get('id') + '/' + this.model.suffix;
    this.selectState(this.model.state);
  }

  @action
  doSelectSuffix(suffix) {
    this.model.suffix = suffix;
    this.model.doi = this.model.prefix + '/' + suffix;
  }

  @action
  refresh() {
    this.generate();
  }

  @action
  clear() {
    this.model.suffix = null;
    // this.$('input[type=text]:first').focus();
  }

  @action
  doSelectState(state) {
    this.selectState(state);
  }
}
