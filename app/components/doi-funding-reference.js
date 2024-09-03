import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';

const funderIdentifierTypeList = [
  'Crossref Funder ID',
  'GRID',
  'ISNI',
  'ROR',
  'Other'
];

@classic
export default class DoiFundingReference extends Component {
  funderIdentifierTypeList = funderIdentifierTypeList;
  funderIdentifierTypes = funderIdentifierTypeList;
  isCrossrefId = false;

  @service
  store;

  init(...args) {
    super.init(...args);

    this.selected = this.selected || [];
    this.funders = this.funders || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (funderIdentifierTypeList.includes(this.fragment.get('subject'))) {
      this.set('isCrossrefId', true);
    } else {
      this.set('isCrossrefId', false);
    }
  }

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
  }

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
  }

  @action
  createOnEnterAction(select, e) {
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
  }

  @action
  updateFunderIdentifierAction(value) {
    this.fragment.set('funderIdentifier', value);
  }

  @action
  selectFunderReferenceAction(value) {
    this.updateFunderReference(value);
  }

  @action
  updateFunderNameAction(value) {
    this.fragment.set('funderName', value);
  }

  @action
  selectFunderIdentifierTypeAction(value) {
    this.fragment.set('funderIdentifierType', value);
  }

  @action
  updateSchemeUri(value) {
    this.fragment.set('schemeUri', value);
  }

  @action
  updateAwardNumberAction(value) {
    this.fragment.set('awardNumber', value);
  }

  @action
  updateAwardTitleAction(value) {
    this.fragment.set('awardTitle', value);
  }

  @action
  updateAwardUriAction(value) {
    this.fragment.set('awardUri', value);
  }

  @action
  deleteFundingReferenceAction() {
    this.model.get('fundingReferences').removeObject(this.fragment);
  }

  @action
  searchFundingReferencesAction(query) {
    let self = this;
    this.store
      .query('funder', { query })
      .then(function (funders) {
        funders = funders.sortBy('name')
        self.set('funders', funders);
      })
      .catch(function (reason) {
        console.debug(reason);
        return [];
      });
  }
}
