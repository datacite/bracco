import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

const rightsIdentifierTypeList = [
  'Crossref Rights ID',
  'GRID',
  'ISNI',
  'ROR',
  'Other',
];

export default Component.extend({
  rightsIdentifierTypeList,
  rightsIdentifierTypes: rightsIdentifierTypeList,
  isCrossrefId: false,
  selected: [],
  store: service(),

  rightsArray: [],

  didReceiveAttrs() {
    this._super(...arguments);

    if (rightsIdentifierTypeList.includes(this.fragment.get('subject'))) {
      this.set('isCrossrefId', true);
    } else {
      this.set('isCrossrefId', false);
    }
  },
  updateRightsSchemeAndType(scheme) {
    switch (scheme) {
      case scheme == 'ROR':
        this.fragment.set('rightsIdentifierType', 'ROR');
        break;
      case scheme == 'Crossref Rights ID':
        this.fragment.set('rightsIdentifierType', 'Crossref Rights ID');
        break;
      case scheme == 'GRID':
        this.fragment.set('relatedIdentifierType', 'GRID');
        break;
      case scheme == 'ISNI':
        this.fragment.set('rightsIdentifierType', 'ISNI');
        break;
      default:
        this.fragment.set('rightsIdentifierType', 'Other');
        break;
    }
  },
  updateRights(rights) {
    if (rights.uri) {
      this.fragment.set('rightsName', rights.name);
      this.fragment.set('rightsIdentifierType', 'Crossref Rights ID');
      this.fragment.set('schemeUri', 'https://www.crossref.org/services/rights-registry/');
      this.fragment.set('rightsIdentifier', rights.uri);
      this.set('isCrossrefId', true);
    } else {
      this.fragment.set('rightsIdentifierType', 'Other');
      this.fragment.set('rightsIdentifier', null);
      this.fragment.set('rightsName', rights);
      this.updateRightsSchemeAndType(null);
      this.set('isCrossrefId', false);
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        if (!this.selected.includes(select.searchText)) {
          this.rightsIdentifierTypes.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('rightsName', select.searchText);
          this.fragment.set('rightsIdentifierType', 'Other');
          this.set('rightsIdentifierTypes', rightsIdentifierTypeList);
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
      let self = this;
      this.store.query('rights', { query }).then(function(rightsArray) {
        self.set('rights', rightsArray);
      });
    },
  },
});

