import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
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

export default Controller.extend({
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
            self.model.set('clientType', 'repository');
            self.model.set('re3data', 'https://doi.org/' + repo.id);
            self.model.set('name', repo.repositoryName);
            self.model.set('description', repo.description);
            self.model.set(
              'alternateName',
              A(repo.additionalNames).firstObject.text
            );
            self.model.set('url', repo.repositoryUrl);
            if (repo.software.length > 0) {
              let software = A(repo.software).firstObject.name;
              if (software === 'DataVerse') {
                software = 'Dataverse';
              } else if (software === 'unknown') {
                software = 'Other';
              }
              self.model.set('software', capitalize(software));
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
              self.model.set('repositoryType', A(repo.types).mapBy('text'));
            }
            if (repo.certificates.length > 0) {
              self.model.set('certificate', A(repo.certificates).mapBy('text'));
            }
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      } else {
        this.model.set('re3data', null);
      }
    },
    searchClientType(query) {
      let clientTypes = clientTypeList.filter(function (clientType) {
        return clientType.startsWith(query.toLowerCase());
      });
      this.set('clientTypes', clientTypes);
    },
    selectClientType(clientType) {
      this.model.set('clientType', clientType);
      this.set('clientTypes', clientTypeList);
    },
    searchSoftware(query) {
      let softwares = softwareList.filter(function (software) {
        return software.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('softwares', softwares);
    },
    selectSoftware(software) {
      this.model.set('software', software);
      this.set('softwares', softwareList);
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
      repository
        .save()
        .then(function (repository) {
          self.transitionToRoute('repositories.show', repository);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.transitionToRoute('repositories.show', this.model);
    }
  }
});
