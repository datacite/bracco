/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isURL, isISBN } from 'validator';

const relationTypeList = [
  'Cites',
  'IsCitedBy',
  'Compiles',
  'IsCompiledBy',
  'Continues',
  'IsContinuedBy',
  'Describes',
  'IsDescribedBy',
  'Documents',
  'IsDocumentedBy',
  'IsDerivedFrom',
  'IsSourceOf',
  'HasMetadata',
  'IsMetadataFor',
  'HasPart',
  'IsPartOf',
  'IsSupplementedBy',
  'IsSupplementTo',
  'Obsoletes',
  'IsObsoletedBy',
  'References',
  'IsReferencedBy',
  'Requires',
  'IsRequiredBy',
  'Reviews',
  'IsReviewedBy',
  'HasVersion',
  'IsVersionOf',
  'IsNewVersionOf',
  'IsPreviousVersionOf',
  'IsVariantFormOf',
  'IsOriginalFormOf',
  'IsIdenticalTo',
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

const resourceTypeGeneralList = [
  'Audiovisual',
  'Collection',
  'DataPaper',
  'Dataset',
  'Event',
  'Image',
  'InteractiveResource',
  'Model',
  'PhysicalObject',
  'Service',
  'Software',
  'Sound',
  'Text',
  'Workflow',
  'Other',
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
  resourceTypeGeneralList,
  resourceTypesGeneral: resourceTypeGeneralList,

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
    const arxiv = /^(arXiv:)(\d{4}.\d{4,5}|[a-z\-]+(\.[A-Z]{2})?\/\d{7})(v\d+)?/;
    const doi = /^(10\.\d{4,5}\/.+)/;
    const bibcode = /\d{4}[A-Za-z\.\&]{5}[\w\.]{4}[ELPQ-Z\.][\d\.]{4}[A-Z]/;
    const urn = /^urn:[a-z0-9][a-z0-9-]{0,31}:[a-z0-9()+,\-.:=@;$_!*'%/?#]/;

    switch (true) {
      case value == null:
        this.fragment.set('relatedIdentifier', null);
        this.fragment.set('relatedIdentifierType', null);
        this.set('controlledIdentifierType', false);
        break;
      case ark.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'ARK');
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
      case urn.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'URN');
        this.set('controlledIdentifierType', true);
        break;
      case isISBN(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'ISBN');
        this.set('controlledIdentifierType', true);
        break;
      // // EAN currently not supported https://github.com/validatorjs/validator.js/issues/797
      // case isEAN(value):
      //   this.fragment.set('relatedIdentifier', value);
      //   this.fragment.set('relatedIdentifierType', 'EAN13');
      //   this.set('controlledIdentifierType', true);
      //   break;
      case isURL(value):
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
  selectResourceTypeGeneral(resourceTypeGeneral) {
    this.fragment.set('resourceTypeGeneral', resourceTypeGeneral);
    this.set('resourceTypesGeneral', resourceTypeGeneralList);
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
    selectResourceTypeGeneral(resourceTypeGeneral) {
      this.selectResourceTypeGeneral(resourceTypeGeneral);
    },
    deleteRelatedIdentifier() {
      this.model.get('relatedIdentifiers').removeObject(this.fragment);
    },
  },
});
