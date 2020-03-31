import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { spdxLicenseList } from '@ember/public/spdx-licenses.json';

// const spdxLicenseListM = $.getJSON('@ember/public/spdx-licenses.json');
const spdxLicenseListM = spdxLicenseList;

export default Component.extend({
  spdxLicenseListM,
  rightsIdentifierTypes: spdxLicenseListM,
  isSpdxId: false,
  selected: [],
  store: service(),

  rightsArray: [],

  didReceiveAttrs() {
    this._super(...arguments);

    if (spdxLicenseListM.includes(this.fragment.get('rights'))) {
      this.set('isSpdxId', true);
    } else {
      this.set('isSpdxId', false);
    }
  },
  updateRights(rights) {
    if (rights.name) {
      this.fragment.set('rights', rights.name);
      this.fragment.set('rightsUri', rights.url);
      this.fragment.set('rightsIdentifier', rights.name);
      this.fragment.set('schemeUri', 'https://spdx.org/licenses/');
      this.fragment.set('rightsIdentifierScheme', 'SPDX');
      this.set('isSpdxId', true);
    } else {
      this.fragment.set('rights', null);
      this.fragment.set('rightsUri', null);
      this.fragment.set('rightsIdentifier', null);
      this.fragment.set('schemeUri', null);
      this.fragment.set('rightsIdentifierScheme', null);
      this.set('isSpdxId', false);
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        if (!this.selected.includes(select.searchText)) {
          this.rightsIdentifierTypes.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('rights', select.searchText);
          this.fragment.set('rightsIdentifierType', 'Other');
          this.set('rightsIdentifierTypes', spdxLicenseListM);
        }
      }
    },
    updateRightsIdentifier(value) {
      this.fragment.set('rightsIdentifier', value);
    },
    selectRights(value) {
      this.updateRights(value);
    },
    // updateRightsName(value) {
    //   this.fragment.set('rightsName', value);
    // },
    // selectRightsIdentifierType(value) {
    //   this.fragment.set('rightsIdentifierType', value);
    // },
    updateSchemeUri(value) {
      this.fragment.set('schemeUri', value);
    },
    updateRightsIdentifierScheme(value) {
      this.fragment.set('rightsIdentifierScheme', value);
    },
    // updateAwardTitle(value) {
    //   this.fragment.set('awardTitle', value);
    // },
    updateRightsUri(value) {
      this.fragment.set('rightsUri', value);
    },
    deleteRights() {
      this.model.get('rights').removeObject(this.fragment);
    },
    searchRights(query) {
      let rights = spdxLicenseListM.filter(function(rights) {
        return rights.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('rights', rights);
    },
  },
});

