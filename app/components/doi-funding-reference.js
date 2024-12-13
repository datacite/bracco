// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

const funderIdentifierTypeList = [
  'Crossref Funder ID',
  'GRID',
  'ISNI',
  'ROR',
  'Other'
];

export default class DoiFundingReference extends Component {
  funderIdentifierTypeList = funderIdentifierTypeList;
  funderIdentifierTypes = funderIdentifierTypeList;
  isCrossrefId = false;

  @service
  store;

  constructor(...args) {
    super(...args);

    this.selected = this.selected || [];
    this.funders = this.funders || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (funderIdentifierTypeList.includes(this.fragment.subject)) {
      this.isCrossrefId = true;
    } else {
      this.isCrossrefId = false;
    }
  }

  updateFunderSchemeAndType(scheme) {
    switch (scheme) {
      case scheme == 'ROR':
        this.fragment.funderIdentifierType = 'ROR';
        break;
      case scheme == 'Crossref Funder ID':
        this.fragment.funderIdentifierType = 'Crossref Funder ID';
        break;
      case scheme == 'GRID':
        this.fragment.relatedIdentifierType = 'GRID';
        break;
      case scheme == 'ISNI':
        this.fragment.funderIdentifierType = 'ISNI';
        break;
      default:
        this.fragment.funderIdentifierType = 'Other';
        break;
    }
  }

  updateFunderReference(funder) {
    switch (true) {
      case funder === null:
        this.fragment.funderIdentifierType = 'Other';
        this.fragment.funderIdentifier = null;
        this.fragment.funderName = null;
        this.updateFunderSchemeAndType(null);
        this.isCrossrefId = false;
        break;
      case typeof funder == 'string':
        this.fragment.funderIdentifierType = 'Other';
        this.fragment.funderIdentifier = null;
        this.fragment.funderName = funder;
        this.updateFunderSchemeAndType(null);
        this.isCrossrefId = alse;
        break;
      default:
        this.fragment.funderName = funder.name;
        this.fragment.funderIdentifierType = 'Crossref Funder ID';
        this.fragment.schemeUri = 'https://www.crossref.org/services/funder-registry/';
        this.fragment.funderIdentifier = 'https://doi.org/' + funder.id;
        this.isCrossrefId = true;
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
        this.fragment.funderName = select.searchText;
        this.fragment.funderIdentifierType = 'Other';
        this.funderIdentifierTypes = funderIdentifierTypeList;
      }
    }
  }

  @action
  updateFunderIdentifierAction(value) {
    this.fragment.funderIdentifier = value;
  }

  @action
  selectFunderReferenceAction(value) {
    this.updateFunderReference(value);
  }

  @action
  updateFunderNameAction(value) {
    this.fragment.funderName = value;
  }

  @action
  selectFunderIdentifierTypeAction(value) {
    this.fragment.funderIdentifierType = value;
  }

  @action
  updateSchemeUri(value) {
    this.fragment.schemeUri = value;
  }

  @action
  updateAwardNumberAction(value) {
    this.fragment.awardNumber = value;
  }

  @action
  updateAwardTitleAction(value) {
    this.fragment.awardTitle = value;
  }

  @action
  updateAwardUriAction(value) {
    this.fragment.awardUri = value;
  }

  @action
  deleteFundingReferenceAction() {
    this.model.fundingReferences.removeObject(this.fragment);
  }

  @action
  searchFundingReferencesAction(query) {
    let self = this;
    this.store
      .query('funder', { query })
      .then(function (funders) {
        funders = funders.sortBy('name')
        self.funders = funders;
      })
      .catch(function (reason) {
        console.debug(reason);
        return [];
      });
  }
}
