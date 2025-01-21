// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { isURL, isISBN } from 'validator';
import { isBlank } from '@ember/utils';

const relatedItemIdentifierTypeList = [
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

export default class DoiRelatedItemIdentifier extends Component {
  @service
  store;

  relatedItemIdentifierTypeList = relatedItemIdentifierTypeList;
  relatedItemIdentifierTypes = relatedItemIdentifierTypeList;

  constructor(...args) {
    super(...args);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (
      relatedItemIdentifierTypeList.includes(this.relatedItemIdentifierType)
    ) {
      this.controlledIdentifierType = true;
    } else {
      this.controlledIdentifierType = false;
    }
  }

  updateRelatedItemIdentifier(value) {
    const ark = /^ark:\/[0-9]{5}\/\S+$/;
    const lsid =
      /^[uU][rR][nN]:[lL][sS][iI][dD]:(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])[:]?(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])?$/;
    const purl = {
      require_host: true,
      host_whitelist: ['purl.org', 'oclc.org']
    };
    const arxiv =
      /^(arXiv:)(\d{4}.\d{4,5}|[a-z\-]+(\.[A-Z]{2})?\/\d{7})(v\d+)?/;
    const doi = /^(10\.\d{4,5}\/.+)/;
    const doiUrl =
      /^(?:(http|https):\/\/(dx.)?(doi.org|handle.test.datacite.org)?\/)(10\.\d{4,5}\/.+)/;
    const bibcode = /\d{4}[A-Za-z\.\&]{5}[\w\.]{4}[ELPQ-Z\.][\d\.]{4}[A-Z]/;
    const urn = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]/;
    const rrid = /^RRID:[a-zA-Z]+.+$/;

    switch (true) {
      case isBlank(value):
        this.fragment.relatedItemIdentifier = null;
        this.fragment.relatedItemIdentifierType = null;
        this.controlledIdentifierType = false;
        break;
      case ark.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'ARK';
        this.controlledIdentifierType = true;
        break;
      case arxiv.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'arXiv';
        this.controlledIdentifierType = true;
        break;
      case doi.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'DOI';
        this.controlledIdentifierType = true;
        break;
      case doiUrl.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'DOI';
        this.controlledIdentifierType = true;
        break;
      case bibcode.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'bibcode';
        this.controlledIdentifierType = true;
        break;
      case lsid.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'LSID';
        this.controlledIdentifierType = true;
        break;
      case isURL(value, purl):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'PURL';
        this.controlledIdentifierType = true;
        break;
      case urn.test(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedIdentifierType = 'URN';
        this.controlledIdentifierType = true;
        break;
      case isISBN(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedIdentifierType = 'ISBN';
        this.controlledIdentifierType = true;
        break;
      case isURL(value):
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = 'URL';
        this.controlledIdentifierType = true;
        break;
      case rrid.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'RRID');
        this.set('controlledIdentifierType', true);
        break;
      default:
        // // Clears the relatedItemIdentifierType in case the user changes the relatedItemIdentifier after selecting it once before.
        this.fragment.relatedItemIdentifier = value;
        this.fragment.relatedItemIdentifierType = null;
        this.controlledIdentifierType = false;
        break;
    }
  }

  selectRelatedItemIdentifierType(relatedItemIdentifierType) {
    this.fragment.relatedItemIdentifierType = relatedItemIdentifierType;
    this.relatedItemIdentifierTypes = relatedItemIdentifierTypeList;
  }

  @action
  updateRelatedItemIdentifierAction(value) {
    this.updateRelatedItemIdentifier(value.trim());
  }

  @action
  selectRelatedItemIdentifierTypeAction(relatedItemIdentifierType) {
    this.selectRelatedItemIdentifierType(relatedItemIdentifierType);
  }
}
