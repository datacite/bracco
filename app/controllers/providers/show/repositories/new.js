import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { A } from '@ember/array';

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
  'Opus',
  'Samvera',
  'Other'
];

export default Controller.extend({
  store: service(),

  re3data: null,
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,

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
            self.model.repository.set('re3data', 'https://doi.org/' + repo.id);
            self.model.repository.set('name', repo.repositoryName);
            self.model.repository.set('description', repo.description);
            self.model.repository.set(
              'alternateName',
              A(repo.additionalNames).firstObject.text
            );
            self.model.repository.set('url', repo.repositoryUrl);
            if (repo.software.length > 0) {
              let software = repo.software[0].name;
              if (software === 'DataVerse') {
                software = 'Dataverse';
              } else if (software === 'unknown') {
                software = 'Other';
              }
              self.model.repository.set('software', capitalize(software));
            }
            if (repo.repositoryLanguages.length > 0) {
              self.model.repository.set(
                'language',
                A(repo.repositoryLanguages).map(function (l) {
                  return langs.where('2', l.text)['1'];
                })
              );
            }
            if (repo.types.length > 0) {
              self.model.repository.set(
                'repositoryType',
                A(repo.types).mapBy('text')
              );
            }
            if (repo.certificates.length > 0) {
              self.model.repository.set(
                'certificate',
                A(repo.certificates).mapBy('text')
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
      this.model.repository.language.pushObject(null);
    },
    addCertificate() {
      this.model.repository.certificate.pushObject(null);
    },
    addRepositoryType() {
      this.model.repository.repositoryType.pushObject(null);
    },
    submit(repository) {
      let self = this;

      // Remove all whitespace on domains.
      if (this.model.repository.domains) {
        let domains = this.model.repository.domains;
        this.model.repository.set('domains', domains.replace(/\s/g, ''));
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
        .then(function (repository) {
          self.transitionToRoute('repositories.show', repository.id);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.repository.rollbackAttributes();
      this.transitionToRoute(
        'providers.show.repositories',
        this.model.provider.id
      );
    }
  }
});
