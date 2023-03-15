import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { clientTypeList, softwareList } from 'bracco/models/repository'

export default Controller.extend({
  store: service(),

  re3data: null,
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,
  clientType: computed('model.repository.clientType', function(){    
    return this.get('clientTypeList').find(item => item.value === this.get('model.repository.clientType'));
  }),

  init(...args) {
    this._super(...args);

    this.repositories = this.repositories || [];
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
      let clientTypes = this.clientTypeList.filter(function (clientType) {
        return clientType.label.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('clientTypes', clientTypes);
    },
    selectClientType(clientType) {
      this.model.repository.set('clientType', clientType.value);
      this.set('clientTypes', this.clientTypeList);
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

      repository
        .save()
        .then(function (repository) {
          self.transitionToRoute('repositories.show.settings', self.model.repository.id, { queryParams: { assignedPrefix: repository.prefixes.firstObject.id } })
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
