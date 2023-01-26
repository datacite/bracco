import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { A } from '@ember/array';
import prefix from 'bracco/abilities/prefix';
import { clientTypeList, softwareList } from 'bracco/models/repository'

export default Controller.extend({
  store: service(),
  prefixes: service(),

  re3data: null,
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,

  init(...args) {
    this._super(...args);

    this.repositories = this.repositories || [];
  },

  // Looks for a prefix to assign to a new repository.
  // First checks provider prefixes for an unassigned prefix.
  // Then, if necessary, checks the general prefix pool.
  findPrefix() {
    let self = this;

    this.prefixes.get_prefixes(1, this.model.repository.get('provider.id'))
    .then((values) => {
      if (values.length > 0) {
        let provider = self.model.provider;
        let value = A(values).get('firstObject');
        let providerPrefix;
        let prefix;

        if (value.constructor.modelName == 'provider-prefix') {
          providerPrefix = value;
          prefix = providerPrefix.get('prefix');
        } else if (value.constructor.modelName == 'prefix') {
          prefix = value;
          providerPrefix = self.model['provider-prefix'] = self.store.createRecord('providerPrefix', {
            provider, prefix
          });
        } else {
          throw new Error("Expecting a prefix object. Got something else.");
        }
        self.model['repository-prefix'].set('provider-prefix', providerPrefix);
        self.model['repository-prefix'].set('prefix', prefix);
      }
    }).catch(function (reason) {
      console.debug(reason);
    });
  },

  actions: {
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
      if (re3data) {
        let self = this;
        this.store
          .findRecord('re3data', re3data.id)
          .then(function (repo) {
            self.set('re3data', repo);
            self.model.repository.set('clientType', 'repository');
            self.model.repository.set(
              're3data',
              'https://doi.org/' + repo.get('id')
            );
            self.model.repository.set('name', repo.get('repositoryName'));
            self.model.repository.set('description', repo.get('description'));
            self.model.repository.set(
              'alternateName',
              A(repo.get('additionalNames')).get('firstObject').text
            );
            self.model.repository.set('url', repo.get('repositoryUrl'));
            if (repo.get('software').length > 0) {
              let software = repo.get('software')[0].name;
              if (software === 'DataVerse') {
                software = 'Dataverse';
              } else if (software === 'unknown') {
                software = 'Other';
              }
              self.model.repository.set('software', capitalize(software));
            }
            if (repo.get('repositoryLanguages').length > 0) {
              self.model.repository.set(
                'language',
                A(repo.get('repositoryLanguages')).map(function (l) {
                  return langs.where('2', l.text)['1'];
                })
              );
            }
            if (repo.get('types').length > 0) {
              self.model.repository.set(
                'repositoryType',
                A(repo.get('types')).mapBy('text')
              );
            }
            if (repo.get('certificates').length > 0) {
              self.model.repository.set(
                'certificate',
                A(repo.get('certificates')).mapBy('text')
              );
            }
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      } else {
        this.model.repository.set('re3data', null);
      }
    },
    searchClientType(query) {
      let clientTypes = clientTypeList.filter(function (clientType) {
        return clientType.startsWith(query.toLowerCase());
      });
      this.set('clientTypes', clientTypes);
    },
    selectClientType(clientType) {
      this.model.repository.set('clientType', clientType);
      this.set('clientTypes', clientTypeList);
    },
    searchSoftware(query) {
      let softwares = softwareList.filter(function (software) {
        return software.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('softwares', softwares);
    },
    selectSoftware(software) {
      this.model.repository.set('software', software);
      this.set('softwares', softwareList);
    },
    addLanguage() {
      this.model.repository.get('language').pushObject(null);
    },
    addCertificate() {
      this.model.repository.get('certificate').pushObject(null);
    },
    addRepositoryType() {
      this.model.repository.get('repositoryType').pushObject(null);
    },

    submit(repository) {
      let self = this;

      // Remove all whitespace on domains.
      if (this.model.repository.get('domains')) {
        let domains = this.model.repository.get('domains');
        this.model.repository.set('domains', domains.replace(/\s/g, ''));
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

      this.findPrefix();

      // Save repository and, if necessary, provider-prefix and repository-prefix.
      repository
        .save()
        .then(function (repository) {
          if (self.model['provider-prefix']) {
            return self.model['provider-prefix'].save();
          } else {
            return null;
          }
        })
        .then(function (value) {
          if (self.model['repository-prefix']) {
            return self.model['repository-prefix'].save();
          } else {
            return null;
          }
        }).then(function (value) {
          self.transitionToRoute('repositories.show', self.model.repository.id, { queryParams: { assignedPrefix: self.model['repository-prefix'].prefix.get('id') } });
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.repository.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.repositories',
        this.get('model.provider.id')
      );
    }
  }
});
