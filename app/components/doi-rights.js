import Component from '@ember/component';
import { isBlank } from '@ember/utils';

export default Component.extend({
  isSpdxId: false,
  selected: [],

  init() {
    this._super();
    this.set('spdxLicenseListComplete', this.spdxList);
    this.set('spdxLicenseList', this.spdxList);
  },
  updateRights(rights) {
    if (rights instanceof String) {
      this.fragment.set('rights', null);
      this.fragment.set('rightsUri', null);
      this.set('isSpdxId', false);
    } else {
      this.fragment.set('rights', rights.name);
      this.fragment.set('rightsUri', rights.detailsUrl);
      this.set('isSpdxId', true);
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        if (!this.selected.includes(select.searchText)) {
          this.spdxLicenseList.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('rights', select.searchText);
          this.set('spdxLicenseList', this.spdxLicenseListComplete);
        }
      }
    },
    selectRights(value) {
      this.updateRights(value);
    },
    updateRightsUri(value) {
      this.fragment.set('rightsUri', value);
    },
    deleteRights() {
      this.model.get('rightsList').removeObject(this.fragment);
    },
    searchRights(query) {
      let rightsFound = this.spdxLicenseListComplete.filter(function(rights) {
        return rights.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('spdxLicenseList', rightsFound);
    },
  },
});

