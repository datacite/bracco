// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { isBlank, typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class DoiRights extends Component {
  isSpdxId = false;

  init(...args) {
    super.init(...args);

    this.selected = this.selected || [];
    this.spdxLicenseListComplete = this.spdx.spdxList;
    this.spdxLicenseList = this.spdx.spdxList;
  }

  updateRights(rights) {
    switch (true) {
      case isBlank(rights):
        this.fragment.rights = null;
        this.fragment.rightsUri = null;
        this.isSpdxId = false;
        break;
      case typeOf(rights) === 'string':
        this.fragment.rights = rights;
        this.fragment.rightsUri = null;
        this.isSpdxId = false;
        break;
      default:
        this.fragment.rights = rights.name;
        this.fragment.rightsUri = rights.seeAlso[0];
        this.isSpdxId = true;
        break;
    }
  }

  @action
  createOnEnter(select, e) {
    if (
      e.keyCode === 13 &&
      select.isOpen &&
      !select.highlighted &&
      !isBlank(select.searchText)
    ) {
      if (!this.selected.includes(select.searchText)) {
        this.spdxLicenseList.push(select.searchText);
        select.actions.choose(select.searchText);
        this.updateRights(select.searchText);
        this.spdxLicenseList = this.spdxLicenseListComplete;
      }
    }
  }

  @action
  selectRights(value) {
    this.updateRights(value);
  }

  @action
  updateRightsUri(value) {
    this.fragment.rightsUri = value;
  }

  @action
  deleteRights() {
    this.model.rightsList.removeObject(this.fragment);
  }

  @action
  searchRights(query) {
    let rightsFound = this.spdxLicenseListComplete.filter(function (rights) {
      return rights.name.toLowerCase().startsWith(query.toLowerCase());
    });
    this.spdxLicenseList = rightsFound;
  }
}
