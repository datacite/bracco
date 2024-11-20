import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { A } from '@ember/array';
import { clientTypeList, softwareList } from 'bracco/models/repository';

export default class NewController extends Controller {
  @service
  store;

  @service
  router;

  @service
  flashMessages;

  re3data = null;
  softwareList = softwareList;
  softwares = softwareList;
  clientTypeList = clientTypeList;
  clientTypes = clientTypeList;

  @computed('clientTypeList', 'model.repository.clientType')
  get clientType() {
    return this.clientTypeList.find(
      (item) => item.value === this.get('model.repository.clientType')
    );
  }

  init(...args) {
    super.init(...args);

    this.repositories = this.repositories || [];
  }

  @action
  searchRe3DataAction(query) {
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
  }

  @action
  selectRe3DataAction(re3data) {
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
          if (repo.get('additionalNames').length > 0) {
            self.model.repository.set(
              'alternateName',
              A(repo.get('additionalNames')).get('firstObject').text
            );
          } else {
            self.model.repository.set('alternateName', null);
          }
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
  }

  @action
  searchClientTypeAction(query) {
    let clientTypes = this.clientTypeList.filter(function (clientType) {
      return clientType.label.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('clientTypes', clientTypes);
  }

  @action
  selectClientTypeAction(clientType) {
    this.model.repository.set('clientType', clientType.value);
    this.set('clientTypes', this.clientTypeList);
  }

  @action
  searchSoftwareAction(query) {
    let softwares = softwareList.filter(function (software) {
      return software.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('softwares', softwares);
  }

  @action
  selectSoftwareAction(software) {
    this.model.repository.set('software', software);
    this.set('softwares', softwareList);
  }

  @action
  addLanguageAction() {
    this.model.repository.get('language').pushObject(null);
  }

  @action
  addCertificateAction() {
    this.model.repository.get('certificate').pushObject(null);
  }

  @action
  addRepositoryTypeAction() {
    this.model.repository.get('repositoryType').pushObject(null);
  }

  @action
  submitAction(repository) {
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
        repository.prefixes.then(function (prefixes) {
          self.router.transitionTo(
            'repositories.show.settings',
            self.model.repository.id,
            {
              queryParams: {
                assignedPrefix:
                  prefixes.length > 0 ? prefixes.firstObject.id : null
              }
            }
          );
        });
      })
      .catch(function (reason) {
        console.debug(reason);
        let msg = reason?.errors[0]?.title
          ? reason.errors[0].title
          : reason?.title
          ? reason.title
          : 'Cause is unknown.  Please contact support.';

        self
          .get('flashMessages')
          .danger(
            'An error occurred and while saving this repository.' + '  ' + msg
          );
      });
  }

  @action
  cancelAction() {
    this.model.repository.rollbackAttributes();
    this.router.transitionTo(
      'providers.show.repositories',
      this.get('model.provider.id')
    );
  }
}
