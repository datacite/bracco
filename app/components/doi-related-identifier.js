/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { inject as service } from '@ember/service';

const relationTypeList = [
  'IsCitedBy',
  'Cites',
  'IsSupplementTo',
  'IsSupplementedBy',
  'IsContinuedBy',
  'Continues',
  'IsDescribedBy',
  'Describes',
  'HasMetadata',
  'IsMetadataFor',
  'HasVersion',
  'IsVersionOf',
  'IsNewVersionOf',
  'IsPreviousVersionOf',
  'IsPartOf',
  'HasPart',
  'IsReferencedBy',
  'References',
  'IsDocumentedBy',
  'Documents',
  'IsCompiledBy',
  'Compiles',
  'IsVariantFormOf',
  'IsOriginalFormOf',
  'IsIdenticalTo',
  'IsReviewedBy',
  'Reviews',
  'IsDerivedFrom',
  'IsSourceOf',
  'IsRequiredBy',
  'Requires',
  'IsObsoletedBy',
  'Obsoletes',
];

const relatedIdentifierTypeList = [
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
  'w3id',
];

export default Component.extend({
  store: service(),
  relationTypeList,
  relationTypes: relationTypeList,
  relatedIdentifierTypeList,
  relatedIdentifierTypes: relatedIdentifierTypeList,
  controlledIdentifierType: false,
  isMetadataRelationType: false,
  isMetadataRelationTypes: [ 'HasMetadata', 'IsMetadataFor' ],

  didReceiveAttrs() {
    this._super(...arguments);

    if (relatedIdentifierTypeList.includes(this.fragment.get('relatedIdentifierType'))) {
      this.set('controlledIdentifierType', true);
    } else {
      this.set('controlledIdentifierType', false);
    }
    if (this.isMetadataRelationTypes.includes(this.fragment.get('relationType'))) {
      this.set('isMetadataRelationType', true);
    } else {
      this.set('isMetadataRelationType', false);
    }
  },
  updateRelatedIdentifier(value) {
    const ark = /^ark:\/[0-9]{5}\/\S+$/;
    const lsid = /^[uU][rR][nN]:[lL][sS][iI][dD]:(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%]):(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])[:]?(A-Za-z0-9][A-Za-z0-9()+,-.=@;$_!*'"%])?$/;
    const purl = /^http?:\/\/(purl\.oclc\.org\/)/;
    const isbn = /^(?:ISBN(?:-10)?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$)↵[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$/;
    const arxiv = /^(arXiv:)(\d{4}.\d{4,5}|[a-z\-]+(\.[A-Z]{2})?\/\d{7})(v\d+)?/;
    const doi = /^(10\.\d{4,5}\/.+)/;
    const bibcode = /\d{4}[A-Za-z\.\&]{5}[\w\.]{4}[ELPQ-Z\.][\d\.]{4}[A-Z]/;
    const url = /^(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    switch (true) {
      case value == null:
        this.fragment.set('relatedIdentifier', null);
        this.fragment.set('relatedIdentifierType', null);
        this.set('controlledIdentifierType', false);
        break;
      case ark.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'ark');
        this.set('controlledIdentifierType', true);
        break;
      case arxiv.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'arXiv');
        this.set('controlledIdentifierType', true);
        break;
      case doi.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'DOI');
        this.set('controlledIdentifierType', true);
        break;
      case bibcode.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'bibcode');
        this.set('controlledIdentifierType', true);
        break;
      case isbn.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'ISBN');
        this.set('controlledIdentifierType', true);
        break;
      case lsid.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'LSID');
        this.set('controlledIdentifierType', true);
        break;
      case purl.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'PURL');
        this.set('controlledIdentifierType', true);
        break;
      case url.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'URL');
        this.set('controlledIdentifierType', true);
        break;
      default:
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', null);
        this.set('controlledIdentifierType', false);
        break;
    }

    console.log(this.fragment.get('relatedIdentifier'));
    console.log(this.fragment.get('relatedIdentifierType'));
  },
  selectRelationType(relationType) {
    if (this.isMetadataRelationTypes.includes(relationType)) {
      this.set('isMetadataRelationType', true);
    } else {
      this.set('isMetadataRelationType', false);
    }
    this.fragment.set('relationType', relationType);
    this.set('relationTypes', relationTypeList);
  },
  selectRelatedIdentifierType(relatedIdentifierType) {
    this.fragment.set('relatedIdentifierType', relatedIdentifierType);
    this.set('relatedIdentifierTypes', relatedIdentifierTypeList);
  },
  actions: {
    updateRelatedIdentifier(value) {
      this.updateRelatedIdentifier(value.trim());
    },
    updateRelatedMetadataScheme(value) {
      this.fragment.set('relatedMetadataScheme', value);
    },
    updateSchemeURI(value) {
      this.fragment.set('schemeUri', value);
    },
    updateSchemeType(value) {
      this.fragment.set('schemeType', value);
    },
    selectRelationType(relationType) {
      this.selectRelationType(relationType);
    },
    selectRelatedIdentifierType(relatedIdentifierType) {
      this.selectRelatedIdentifierType(relatedIdentifierType);
    },
    deleteRelatedIdentifier() {
      this.model.get('relatedIdentifiers').removeObject(this.fragment);
    },
  },
});
