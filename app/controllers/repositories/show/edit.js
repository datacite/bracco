import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import { capitalize } from '@ember/string';
import langs from 'langs';
import { isBlank } from '@ember/utils';
import { clientTypeList, softwareList } from 'bracco/models/repository';

@classic
export default class EditController extends Controller {
  @service
  currentUser;

  @service
  store;

  @service
  router;

  @service
  flashMessages;

  edit = false;
  change = false;
  delete = false;
  provider = null;
  setPassword = false;
  softwareList = softwareList;
  softwares = softwareList;
  isSoftwareFieldActive = false;
  clientTypeList = clientTypeList;
  clientTypes = clientTypeList;

  @computed('clientTypeList', 'model.clientType')
  get clientType() {
    return this.clientTypeList.find(
      (item) => item.value === this.get('model.clientType')
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
    this.model.set('clientType', clientType.value);
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
    this.model.set('software', software);
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
      this.model.set('software', software);
      this.set('softwares', softwareList);
      return false;
    }
  }

  @action
  addLanguageAction() {
    this.model.get('language').pushObject(null);
  }

  @action
  addCertificateAction() {
    this.model.get('certificate').pushObject(null);
  }

  @action
  addRepositoryTypeAction() {
    this.model.get('repositoryType').pushObject(null);
  }

  @action
  submitAction(repository) {
    let self = this;
    repository
      .save()
      .then(function (repository) {
        self.router.transitionTo('repositories.show', repository);
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('repositories.show', this.model);
  }

  // This helps to manage the validation state of the software field.  The field is required, but we don't want to show it as invalid until the user has interacted with it.
  @action
  activateSoftwareField() {
    return this.set('isSoftwareFieldActive', true);
  }
}
