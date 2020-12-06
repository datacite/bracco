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
        Authorization: 'Bearer ' + this.currentUser.jwt
      }
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            self.model.set('passwordInput', data.phrase);
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
          self.repository.set('clientType', 'repository');
          self.repository.set('re3data', 'https://doi.org/' + repo.id);
          self.repository.set('name', repo.repositoryName);
          self.repository.set('description', repo.description);
          self.repository.set(
            'alternateName',
            A(repo.additionalNames).firstObject.text
          );
          self.repository.set('url', repo.repositoryUrl);
          if (repo.software.length > 0) {
            let software = A(repo.software).firstObject.name;
            if (software === 'DataVerse') {
              software = 'Dataverse';
            } else if (software === 'unknown') {
              software = 'Other';
            }
            self.repository.set('software', capitalize(software));
          }
          if (repo.repositoryLanguages.length > 0) {
            self.repository.set(
              'language',
              A(repo.repositoryLanguages).map(function (l) {
                return langs.where('2', l.text)['1'];
              })
            );
          }
          if (repo.types.length > 0) {
            self.repository.set('repositoryType', A(repo.types).mapBy('text'));
          }
          if (repo.certificates.length > 0) {
            self.repository.set(
              'certificate',
              A(repo.certificates).mapBy('text')
            );
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
      this.repository.set('confirmSymbol', repository.symbol);
      this.set('re3data', repository.re3data);

      if (!isArray(this.repository.language)) {
        this.repository.set('language', [this.repository.language]);
      }
      if (this.repository.language.length == 0) {
        this.repository.language.pushObject(null);
      }
      if (!isArray(this.repository.repositoryType)) {
        this.repository.set('repositoryType', [this.repository.repositoryType]);
      }
      if (this.repository.repositoryType.length == 0) {
        this.repository.repositoryType.pushObject('');
      }
      if (!isArray(this.repository.certificate)) {
        this.repository.set('certificate', [this.model.certificate]);
      }
      if (this.repository.certificate.length == 0) {
        this.repository.certificate.pushObject('');
      }
      this.set('edit', true);
    },
    change(repository) {
      this.set('repository', repository);
      this.repository.set('confirmSymbol', repository.symbol);
      this.set('change', true);
    },
    generate() {
      this.generate();
    },
    delete(repository) {
      this.set('repository', repository);
      this.repository.set('confirmSymbol', null);
      this.repository.validateSync();
      this.set('provider', repository.provider);
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
      this.model.language.pushObject(null);
    },
    addCertificate() {
      this.model.certificate.pushObject(null);
    },
    addRepositoryType() {
      this.model.repositoryType.pushObject(null);
    },
    submit(repository) {
      let self = this;

      // Remove all whitespace on domains.
      if (repository.domains) {
        let domains = repository.domains;
        repository.set('domains', domains.replace(/\s/g, ''));
      }

      repository.set(
        'language',
        repository.language.filter(function (language) {
          return !isBlank(language);
        })
      );

      repository.set(
        'repositoryType',
        repository.repositoryType.filter(function (repositoryType) {
          return !isBlank(repositoryType);
        })
      );

      repository.set(
        'certificate',
        repository.certificate.filter(function (certificate) {
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
      let providerId = this.model.provider.id;
      this.store
        .findRecord('repository', this.model.id, {
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
