import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { A } from '@ember/array';
import { clientTypeList, softwareList } from 'bracco/models/repository';

@classic
export default class NewController extends Controller {
  @service
  store;

  @service
  router;

  @service
  flashMessages;

  softwareList = softwareList;
  softwares = softwareList;
  isSoftwareFieldActive = false;
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
  createSoftwareOnEnter(select, e) {
    if (
      e.keyCode === 13 &&
      select.isOpen &&
      !select.highlighted &&
      !isBlank(select.searchText)
    ) {
      e.preventDefault();
      const software = select.searchText;
      if (!this.softwares.includes(software)) {
        this.set('softwares', [...this.softwares, software]);
      }
      select.actions.choose(software);
      this.model.repository.set('software', software);
      this.set('softwares', softwareList);
      return false;
    }
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

  // This helps to manage the validation state of the software field.  The field is required, but we don't want to show it as invalid until the user has interacted with it.
  @action
  activateSoftwareField() {
    return this.set('isSoftwareFieldActive', true);
  }
}
