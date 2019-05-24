import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const softwareList = [
  'CKAN',
  'Dataverse',
  'DSpace',
  'EPrints',
  'Fedora',
  'Invenio',
  'Nesstar',
  'Open Journal Systems (OJS)',
  'Samvera',
  'Other'
]

export default Component.extend({
  currentUser: service(),
  store: service(),

  edit: false,
  change: false,
  delete: false,
  client: null,
  provider: null,
  setPassword: false,
  repository: null,
  repositories: [],
  softwareList,
  softwares: softwareList,

  reset() {
    this.client.set('passwordInput', null);
    this.set('edit', false);
    this.set('change', false);
    this.set('delete', false);
  },
  generate() {
    let self = this;
    let url = ENV.API_URL + '/random';
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.currentUser.get('jwt')
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          self.get('model').set('passwordInput', data.phrase);
        });
      } else {
        console.log(response);
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  selectRepository(repository) {
    if (repository) {
      let self = this;
      this.store.findRecord('repository', repository.id).then(function (repo) {
        self.set('repository', repo)
        self.get('client').set('repository', repo);
        self.get('client').set('name', repo.get('repositoryName'));
        self.get('client').set('description', repo.get('description'));
        self.get('client').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          }
          self.get('client').set('software', software.capitalize());
        }
      });
    } else {
      this.client.set('repository', null);
    }
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function (software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.client.set('software', software);
    this.set('softwares', softwareList);
  },

  actions: {
    edit(client) {
      this.set('client', client);
      this.client.set('confirmSymbol', client.get('symbol'));
      this.set('repository', client.get('repository'));
      this.set('edit', true);
    },
    change(client) {
      this.set('client', client);
      this.client.set('confirmSymbol', client.get('symbol'));
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(client) {
      this.set('client', client);
      this.client.set('confirmSymbol', null);
      this.client.validateSync();
      this.set('provider', client.get('provider'));
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.client.set('keepPassword', false);
      this.client.save().then(function () {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    searchy(query) {
      this.set('repositories', this.store.query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    submit(client) {
      let self = this;

      // Remove all whitespace on domains.
      if (client.get('domains')) {
        var domains = client.get('domains');
        client.set('domains', domains.replace(/\s/g, ''));
      }

      client.save().then(function () {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    destroy(client) {
      let self = this;
      this.store.findRecord("client", client.id, { backgroundReload: false }).then(function (client) {
        client.destroyRecord().then(function () {
          self.router.transitionTo('providers.show.settings', self.get('provider'));
        });
      });
    },
    // destroy(client) {
    //   let self = this;
    //   if (this.get('confirmId') === client.get('symbol')) {
    //     client.destroyRecord().then(function () {
    //       self.get('router').transitionTo('providers.show.settings', self.get('provider'));
    //     }).catch(function(reason){
    //       Ember.Logger.assert(false, reason);
    //     });
    //   }
    // },
    cancel() {
      this.model.rollbackAttributes();
      this.reset();
    },
    onSuccess() {
    },
    onError(error) {
      if (console.debug) {
        console.debug(error);
      } else {
        console.log(error);
      }
    },
    searchSoftware(query) {
      this.searchSoftware(query);
    },
    selectSoftware(software) {
      this.selectSoftware(software);
    }
  }
});
