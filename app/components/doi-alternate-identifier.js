import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';

const alternateIdentifierTypeList = [
  'ARK',
  'arXiv',
  'bibcode',
  'CSTR',
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
  'RRID',
  'UPC',
  'URL',
  'URN',
  'w3id'
];

@classic
export default class DoiAlternateIdentifier extends Component {
  alternateIdentifierTypeList = alternateIdentifierTypeList;
  alternateIdentifierTypes = alternateIdentifierTypeList;

  init(...args) {
    super.init(...args);

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
        this.set('alternateIdentifierTypes', alternateIdentifierTypeList);
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
    this.set('alternateIdentifierTypes', alternateIdentifierTypeList);
  }

  @action
  deleteAlternateIdentifier() {
    this.model.get('alternateIdentifiers').removeObject(this.fragment);
  }
}
