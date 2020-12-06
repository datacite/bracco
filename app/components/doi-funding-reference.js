import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

const funderIdentifierTypeList = [
  'Crossref Funder ID',
  'GRID',
  'ISNI',
  'ROR',
  'Other'
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

    if (funderIdentifierTypeList.includes(this.fragment.subject)) {
      this.set('isCrossrefId', true);
    } else {
      this.set('isCrossrefId', false);
    }
  },
  updateFunderSchemeAndType(scheme) {
    switch (scheme) {
      case scheme == 'ROR':
        this.fragment.set('funderIdentifierType', 'ROR');
        break;
      case scheme == 'Crossref Funder ID':
        this.fragment.set('funderIdentifierType', 'Crossref Funder ID');
        break;
      case scheme == 'GRID':
        this.fragment.set('relatedIdentifierType', 'GRID');
        break;
      case scheme == 'ISNI':
        this.fragment.set('funderIdentifierType', 'ISNI');
        break;
      default:
        this.fragment.set('funderIdentifierType', 'Other');
        break;
    }
  },
  updateFunderReference(funder) {
    switch (true) {
      case funder === null:
        this.fragment.set('funderIdentifierType', 'Other');
        this.fragment.set('funderIdentifier', null);
        this.fragment.set('funderName', null);
        this.updateFunderSchemeAndType(null);
        this.set('isCrossrefId', false);
        break;
      case typeof funder == 'string':
        this.fragment.set('funderIdentifierType', 'Other');
        this.fragment.set('funderIdentifier', null);
        this.fragment.set('funderName', funder);
        this.updateFunderSchemeAndType(null);
        this.set('isCrossrefId', false);
        break;
      default:
        this.fragment.set('funderName', funder.name);
        this.fragment.set('funderIdentifierType', 'Crossref Funder ID');
        this.fragment.set(
          'schemeUri',
          'https://www.crossref.org/services/funder-registry/'
        );
        this.fragment.set('funderIdentifier', 'https://doi.org/' + funder.id);
        this.set('isCrossrefId', true);
        break;
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (
        e.keyCode === 13 &&
        select.isOpen &&
        !select.highlighted &&
        !isBlank(select.searchText)
      ) {
        if (!this.selected.includes(select.searchText)) {
          this.funderIdentifierTypes.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('funderName', select.searchText);
          this.fragment.set('funderIdentifierType', 'Other');
          this.set('funderIdentifierTypes', funderIdentifierTypeList);
        }
      }
    },
    updateFunderIdentifier(value) {
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
      this.model.fundingReferences.removeObject(this.fragment);
    },
    searchFundingReferences(query) {
      let self = this;
      this.store
        .query('funder', { query })
        .then(function (funders) {
          self.set('funders', funders);
        })
        .catch(function (reason) {
          console.debug(reason);
          return [];
        });
    }
  }
});
