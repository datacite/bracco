import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({

  isSpdxId: false,
  selected: [],
  store: service(),

  rightsArray: [],

  init() {
    this._super();
    this.set('spdxLicenseListComplete', this.spdxList);
    this.set('spdxLicenseList', this.spdxList);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    // if (this.spdxLicenseListComplete.includes(this.fragment.get('rights'))) {
    //   this.set('isSpdxId', true);
    // } else {
    //   this.set('isSpdxId', false);
    // }
  },
  updateRights(rights) {
    if (rights instanceof String) {
      this.fragment.set('rights', null);
      this.fragment.set('rightsUri', null);
      // // these fields are currently not supported bythe JSON API
      // this.fragment.set('rightsIdentifier', null);
      // this.fragment.set('schemeUri', null);
      // this.fragment.set('rightsIdentifierScheme', null);
      this.set('isSpdxId', false);
    } else {
      this.fragment.set('rights', rights.name);
      this.fragment.set('rightsUri', rights.detailsUrl);
      // this.fragment.set('rightsIdentifier', rights.licenseId);
      // this.fragment.set('schemeUri', 'https://spdx.org/licenses/');
      // this.fragment.set('rightsIdentifierScheme', 'SPDX');
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
    // updateRightsIdentifier(value) {
    //   this.fragment.set('rightsIdentifier', value);
    // },
    selectRights(value) {
      this.updateRights(value);
    },
    // updateSchemeUri(value) {
    //   this.fragment.set('schemeUri', value);
    // },
    // updateRightsIdentifierScheme(value) {
    //   this.fragment.set('rightsIdentifierScheme', value);
    // },
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

