import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isArray, A } from '@ember/array';
import { isBlank } from '@ember/utils';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { capitalize } from '@ember/string';
import langs from 'langs';

const clientTypeList = ['repository', 'periodical'];
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
];

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
        Authorization: 'Bearer ' + this.currentUser.get('jwt')
      }
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            self.get('model').set('passwordInput', data.phrase);
          });
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  selectRe3Data(re3data) {
    if (re3data) {
      let self = this;
      this.store
        .findRecord('re3data', re3data.id)
        .then(function (repo) {
          self.set('re3data', repo);
          self.get('repository').set('clientType', 'repository');
          self
            .get('repository')
            .set('re3data', 'https://doi.org/' + repo.get('id'));
          self.get('repository').set('name', repo.get('repositoryName'));
          self.get('repository').set('description', repo.get('description'));
          self
            .get('repository')
            .set(
              'alternateName',
              A(repo.get('additionalNames')).get('firstObject').text
            );
          self.get('repository').set('url', repo.get('repositoryUrl'));
          if (repo.get('software').length > 0) {
            let software = repo.get('software')[0].name;
            if (software === 'DataVerse') {
              software = 'Dataverse';
            } else if (software === 'unknown') {
              software = 'Other';
            }
            self.get('repository').set('software', capitalize(software));
          }
          if (repo.get('repositoryLanguages').length > 0) {
            self.get('repository').set(
              'language',
              A(repo.get('repositoryLanguages')).map(function (l) {
                return langs.where('2', l.text)['1'];
              })
            );
          }
          if (repo.get('types').length > 0) {
            self
              .get('repository')
              .set('repositoryType', A(repo.get('types')).mapBy('text'));
          }
          if (repo.get('certificates').length > 0) {
            self
              .get('repository')
              .set('certificate', A(repo.get('certificates')).mapBy('text'));
          }
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    } else {
      this.repository.set('re3data', null);
    }
  },
  searchClientType(query) {
    let clientTypes = clientTypeList.filter(function (clientType) {
      return clientType.startsWith(query.toLowerCase());
    });
    this.set('clientTypes', clientTypes);
  },
  selectClientType(clientType) {
    this.repository.set('clientType', clientType);
    this.set('clientTypes', clientTypeList);
  },
  searchSoftware(query) {
    let softwares = softwareList.filter(function (software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    });
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
        this.repository.set('repositoryType', [
          this.repository.get('repositoryType')
        ]);
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
      this.repository
        .save()
        .then(function () {
          self.reset();
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    searchRe3Data(query) {
      let self = this;
      this.store
        .query('re3data', { query, 'page[size]': 25 })
        .then(function (repositories) {
          self.set('repositories', repositories);
        })
        .catch(function (reason) {
          console.debug(reason);
          self.set('repositories', []);
        });
    },
    selectRe3Data(re3data) {
      this.selectRe3Data(re3data);
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
        let domains = repository.get('domains');
        repository.set('domains', domains.replace(/\s/g, ''));
      }

      repository.set(
        'language',
        repository.get('language').filter(function (language) {
          return !isBlank(language);
        })
      );

      repository.set(
        'repositoryType',
        repository.get('repositoryType').filter(function (repositoryType) {
          return !isBlank(repositoryType);
        })
      );

      repository.set(
        'certificate',
        repository.get('certificate').filter(function (certificate) {
          return !isBlank(certificate);
        })
      );

      repository
        .save()
        .then(function () {
          self.reset();
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    destroy() {
      let self = this;
      let providerId = this.model.get('provider.id');
      this.store
        .findRecord('repository', this.model.get('id'), {
          backgroundReload: false
        })
        .then(function (repository) {
          repository.destroyRecord().then(function () {
            self.router.transitionTo('providers.show', providerId);
          });
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.reset();
    },
    onSuccess() {},
    onError(error) {
      console.debug(error);
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
