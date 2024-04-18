import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { computed } from '@ember/object';
import { clientTypeList, softwareList } from 'bracco/models/repository';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),

  edit: false,
  change: false,
  delete: false,
  provider: null,
  setPassword: false,
  re3data: null,
  softwareList,
  softwares: softwareList,
  clientTypeList,
  clientTypes: clientTypeList,
  clientType: computed('clientTypeList', 'model.clientType', function () {
    return this.clientTypeList.find(
      (item) => item.value === this.get('model.clientType')
    );
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
            self.model.set('clientType', 'repository');
            self.model.set('re3data', 'https://doi.org/' + repo.get('id'));
            self.model.set('name', repo.get('repositoryName'));
            self.model.set('description', repo.get('description'));
            if (repo.get('additionalNames').length > 0) {
              self.model.set(
                'alternateName',
                A(repo.get('additionalNames')).get('firstObject').text
              );
            } else {
              self.model.set('alternateName', null);
            }
            self.model.set('url', repo.get('repositoryUrl'));
            if (repo.get('software').length > 0) {
              let software = repo.get('software')[0].name;
              if (software === 'DataVerse') {
                software = 'Dataverse';
              } else if (software === 'unknown') {
                software = 'Other';
              }
              self.model.set('software', capitalize(software));
            }
            if (repo.get('repositoryLanguages').length > 0) {
              self.model.set(
                'language',
                A(repo.get('repositoryLanguages')).map(function (l) {
                  return langs.where('2', l.text)['1'];
                })
              );
            }
            if (repo.get('types').length > 0) {
              self.model.set(
                'repositoryType',
                A(repo.get('types')).mapBy('text')
              );
            }
            if (
              repo.get('subjects').length > 0 &&
              self.model.get('isDisciplinary')
            ) {
              self.model.set('subjects', repo.get('fosSubjects'));
            }
            if (repo.get('certificates').length > 0) {
              self.model.set(
                'certificate',
                A(repo.get('certificates')).mapBy('text')
              );
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
      let clientTypes = this.clientTypeList.filter(function (clientType) {
        return clientType.label.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('clientTypes', clientTypes);
    },
    selectClientType(clientType) {
      this.model.set('clientType', clientType.value);
      this.set('clientTypes', this.clientTypeList);
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
      repository
        .save()
        .then(function (repository) {
          self.router.transitionTo('repositories.show', repository);
        })
        .catch(function (reason) {
          console.debug(reason);
        });
    },
    cancel() {
      this.model.rollbackAttributes();
      this.router.transitionTo('repositories.show', this.model);
    }
  }
});
