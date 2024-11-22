// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

const alternateIdentifierTypeList = [
  'ARK',
  'arXiv',
  'bibcode',
  'DOI',
  'EAN13',
  'EISSN',
  'Handle',
  'IGSN',
  'ISBN',
  'ISSN',
  'ISTC',
  'LISSN',
  'LSID',
  'PMID',
  'PURL',
  'UPC',
  'URL',
  'URN',
  'w3id'
];

export default class DoiAlternateIdentifier extends Component {
  alternateIdentifierTypeList = alternateIdentifierTypeList;
  alternateIdentifierTypes = alternateIdentifierTypeList;

  constructor(...args) {
    super(...args);

    this.selected = this.selected || [];
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
        this.alternateIdentifierTypes.push(select.searchText);
        select.actions.choose(select.searchText);
        this.fragment.set('alternateIdentifierType', select.searchText);
        this.alternateIdentifierTypes = alternateIdentifierTypeList;
      }
    }
  }

  @action
  updateAlternateIdentifier(value) {
    this.fragment.set('alternateIdentifier', value);
  }

  @action
  selectAlternateIdentifierType(alternateIdentifierType) {
    this.fragment.set('alternateIdentifierType', alternateIdentifierType);
    this.alternateIdentifierTypes = alternateIdentifierTypeList;
  }

  @action
  deleteAlternateIdentifier() {
    this.model.alternateIdentifiers.removeObject(this.fragment);
  }
}
