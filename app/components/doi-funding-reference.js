import Component from '@ember/component';
import { inject as service } from '@ember/service';

const funderIdentifierTypeList = [
  'Crossref Funder ID',
  'GRID',
  'ISNI',
  'ROR',
  'Other',
];

export default Component.extend({
  funderIdentifierTypeList,
  funderIdentifierTypes: funderIdentifierTypeList,
  isCrossrefId: false,
  selected: [],
  store: service(),

  funders: [],

  didReceiveAttrs() {
    this._super(...arguments);

    if (funderIdentifierTypeList.includes(this.fragment.get('subject'))) {
      this.set('isCrossrefId', true);
    } else {
      this.set('isCrossrefId', false);
    }
  },
  updateFunderSchemeAndType(scheme) {
    switch (scheme) {
      case scheme == 'ROR':
        // this.fragment.set('schemeUri', 'https://ror.org/');
        this.fragment.set('funderIdentifierType', 'ROR');
        break;
      case scheme == 'Crossref Funder ID':
        // this.fragment.set('schemeUri', 'https://www.crossref.org/services/funder-registry/');
        this.fragment.set('funderIdentifierType', 'Crossref Funder ID');
        break;
      case scheme == 'GRID':
        // this.fragment.set('schemeUri', 'https://www.grid.ac/');
        this.fragment.set('relatedIdentifierType', 'GRID');
        break;
      case scheme == 'ISNI':
        // this.fragment.set('schemeUri', 'http://www.isni.org/isni/');
        this.fragment.set('funderIdentifierType', 'ISNI');
        break;
      default:
        // this.fragment.set('schemeUri', null);
        this.fragment.set('funderIdentifierType', 'Other');
        break;
    }
  },
  updateFunderReference(funder) {
    if (funder) {
      this.fragment.set('funderName', funder.name);
      this.fragment.set('funderIdentifierType', 'Crossref Funder ID');
      this.fragment.set('schemeUri', 'https://www.crossref.org/services/funder-registry/');
      this.fragment.set('funderIdentifier', funder.uri);
      this.set('isCrossrefId', true);
    } else {
      // this.fragment.set('funderName', funder);
      this.fragment.set('funderIdentifierType', null);
      this.fragment.set('funderIdentifier', null);
      this.fragment.set('funderName', null);
      this.updateFunderSchemeAndType(null);
      this.set('isCrossrefId', false);
    }
  },

  actions: {
    updateFunderIdentifierType(value) {
      this.fragment.set('funderIdentifierType', value);
      // this.updateFunderSchemeAndType(value);
    },
    updateFunderIdentifier(value) {
      this.fragment.set('funderIdentifier', value);
    },
    searchFunderIdentifier(value) {
      this.fragment.set('funderIdentifier', value);
    },
    selectFunderReference(value) {
      this.updateFunderReference(value);
    },
    updateFunderName(value) {
      this.fragment.set('funderName', value);
    },
    selectFunderIdentifierType(value) {
      this.fragment.set('funderIdentifierType', value);
    },
    updateSchemeUri(value) {
      this.fragment.set('schemeUri', value);
    },
    updateAwardNumber(value) {
      this.fragment.set('awardNumber', value);
    },
    updateAwardTitle(value) {
      this.fragment.set('awardTitle', value);
    },
    updateAwardUri(value) {
      this.fragment.set('awardUri', value);
    },
    deleteFundingReference() {
      this.model.get('fundingReferences').removeObject(this.fragment);
    },
    searchFundingReferences(query) {
      let self = this;
      this.store.query('funder', { query }).then(function(funders) {
        self.set('funders', funders);
      });
    },
  },
});

