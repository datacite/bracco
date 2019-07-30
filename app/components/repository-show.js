import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isArray } from '@ember/array';
import { isBlank } from '@ember/utils';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const clientTypeList = [
  'repository',
  'periodical'
]
const softwareList = [
  'CKAN',
  'Dataverse',
  'DSpace',
  'EPrints',
  'Fedora',
  'Invenio',
  'Islandora',
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
  provider: null,
  setPassword: false,
  re3data: null,
  repositories: [],
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,

  reset() {
    this.repository.set('passwordInput', null);
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
  selectRepository(re3data) {
    if (re3data) {
      let self = this;
      this.store.findRecord('re3data', re3data.id).then(function (repo) {
        self.set('re3data', repo)
        self.get('repository').set('re3data', 'https://doi.org/' + repo.get('id'));
        self.get('repository').set('name', repo.get('repositoryName'));
        self.get('repository').set('description', repo.get('description'));
        self.get('repository').set('url', repo.get('repositoryUrl'));
        if (repo.get('software').length > 0) {
          let software = repo.get('software')[0].name;
          if (software === "DataVerse") {
            software = "Dataverse";
          }
          self.get('repository').set('software', software.capitalize());
        }
      });
    } else {
      this.repository.set('re3data', null);
    }
  },
  searchClientType(query) {
    var clientTypes = clientTypeList.filter(function(clientType) {
      return clientType.startsWith(query.toLowerCase());
    })
    this.set('clientTypes', clientTypes);
  },
  selectClientType(clientType) {
    this.repository.set('clientType', clientType);
    this.set('clientTypes', clientTypeList);
  },
  searchSoftware(query) {
    var softwares = softwareList.filter(function (software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    })
    this.set('softwares', softwares);
  },
  selectSoftware(software) {
    this.repository.set('software', software);
    this.set('softwares', softwareList);
  },

  actions: {
    edit(repository) {
      this.set('repository', repository);
      this.repository.set('confirmSymbol', repository.get('symbol'));
      this.set('re3data', repository.get('re3data'));

      if (!isArray(this.repository.get('language'))) {
        this.repository.set('language', [this.repository.get('language')]);
      }
      if (this.repository.get('language').length == 0) {
        this.repository.get('language').pushObject(null);
      }
      if (!isArray(this.repository.get('repositoryType'))) {
        this.repository.set('repositoryType', [this.repository.get('repositoryType')]);
      }
      if (this.repository.get('repositoryType').length == 0) {
        this.repository.get('repositoryType').pushObject('');
      }
      if (!isArray(this.repository.get('certificate'))) {
        this.repository.set('certificate', [this.model.get('certificate')]);
      }
      if (this.repository.get('certificate').length == 0) {
        this.repository.get('certificate').pushObject('');
      }
      this.set('edit', true);
    },
    change(repository) {
      this.set('repository', repository);
      this.repository.set('confirmSymbol', repository.get('symbol'));
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(repository) {
      this.set('repository', repository);
      this.repository.set('confirmSymbol', null);
      this.repository.validateSync();
      this.set('provider', repository.get('provider'));
      this.set('delete', true);
    },
    setPassword() {
      let self = this;
      this.repository.set('keepPassword', false);
      this.repository.save().then(function () {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    searchRepository(query) {
      this.set('repositories', this.store.query('repository', { 'query': query, 'page[size]': 25 }));
    },
    selectRepository(repository) {
      this.selectRepository(repository);
    },
    addLanguage() {
      this.model.get('language').pushObject(null);
    },
    addCertificate() {
      this.model.get('certificate').pushObject(null);
    },
    addRepositoryType() {
      this.model.get('repositoryType').pushObject(null);
    },
    submit(repository) {
      let self = this;

      // Remove all whitespace on domains.
      if (repository.get('domains')) {
        var domains = repository.get('domains');
        repository.set('domains', domains.replace(/\s/g, ''));
      }

      repository.set('language', repository.get('language').filter(function(language) {
        return !isBlank(language);
      }));

      repository.set('repositoryType', repository.get('repositoryType').filter(function(repositoryType) {
        return !isBlank(repositoryType);
      }));

      repository.set('certificate', repository.get('certificate').filter(function(certificate) {
        return !isBlank(certificate);
      }));

      repository.save().then(function (repository) {
        self.reset();
      }).catch(function (reason) {
        console.log(reason);
      });
    },
    destroy(repository) {
      let self = this;
      this.store.findRecord("repository", repository.id, { backgroundReload: false }).then(function (repository) {
        repository.destroyRecord().then(function () {
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
    searchClientType(query) {
      this.searchClientType(query);
    },
    selectClientType(clientType) {
      this.selectClientType(clientType);
    },
    searchSoftware(query) {
      this.searchSoftware(query);
    },
    selectSoftware(software) {
      this.selectSoftware(software);
    }
  }
});
