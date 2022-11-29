/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isURL, isISBN } from 'validator';
import { isBlank } from '@ember/utils';

const relatedItemIdentifierTypeList = [
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


export default Component.extend({
  store: service(),
  relatedItemIdentifierTypeList,
  relatedItemIdentifierTypes: relatedItemIdentifierTypeList,

  init(...args) {
    this._super(...args);
    
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (
      relatedItemIdentifierTypeList.includes(
        this.relatedItemIdentifierType
      )
    ) {
      this.set('controlledIdentifierType', true);
    } else {
      this.set('controlledIdentifierType', false);
    }
    
  },
  updateRelatedItemIdentifier(value) {
    const ark = /^ark:\/[0-9]{5}\/\S+$/;
    const lsid = /^[uU][rR][nN]:[lL][sS][iI][dD]:(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])[:]?(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])?$/;
    const purl = {
      require_host: true,
      host_whitelist: ['purl.org', 'oclc.org']
    };
    const arxiv = /^(arXiv:)(\d{4}.\d{4,5}|[a-z\-]+(\.[A-Z]{2})?\/\d{7})(v\d+)?/;
    const doi = /^(10\.\d{4,5}\/.+)/;
    const bibcode = /\d{4}[A-Za-z\.\&]{5}[\w\.]{4}[ELPQ-Z\.][\d\.]{4}[A-Z]/;
    const urn = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]/;

    switch (true) {
      case isBlank(value):
        this.fragment.set('relatedItemIdentifier', null);
        this.fragment.set('relatedItemIdentifierType', null);
        this.set('controlledIdentifierType', false);
        break;
      case ark.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'ARK');
        this.set('controlledIdentifierType', true);
        break;
      case arxiv.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'arXiv');
        this.set('controlledIdentifierType', true);
        break;
      case doi.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'DOI');
        this.set('controlledIdentifierType', true);
        break;
      case bibcode.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'bibcode');
        this.set('controlledIdentifierType', true);
        break;
      case lsid.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'LSID');
        this.set('controlledIdentifierType', true);
        break;
      case isURL(value, purl):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'PURL');
        this.set('controlledIdentifierType', true);
        break;
      case urn.test(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'URN');
        this.set('controlledIdentifierType', true);
        break;
      case isISBN(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'ISBN');
        this.set('controlledIdentifierType', true);
        break;
      case isURL(value):
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', 'URL');
        this.set('controlledIdentifierType', true);
        break;
      default:
        // // Clears the relatedItemIdentifierType in case the user changes the relatedItemIdentifier after selecting it once before.
        this.fragment.set('relatedItemIdentifier', value);
        this.fragment.set('relatedItemIdentifierType', null);
        this.set('controlledIdentifierType', false);
        break;
    }
  },
  
  selectRelatedItemIdentifierType(relatedItemIdentifierType) {
    this.fragment.set('relatedItemIdentifierType', relatedItemIdentifierType);
    this.set('relatedItemIdentifierTypes', relatedItemIdentifierTypeList);
  },
 
  actions: {
    updateRelatedItemIdentifier(value) {
      this.updateRelatedItemIdentifier(value.trim());
    },
    selectRelatedItemIdentifierType(relatedItemIdentifierType) {
      this.selectRelatedItemIdentifierType(relatedItemIdentifierType);
    },
  }
});
