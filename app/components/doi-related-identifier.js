// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { isURL, isISBN } from 'validator';
import { isBlank } from '@ember/utils';
import { pascalCase } from 'pascal-case';
import { tracked } from '@glimmer/tracking';

const relationTypeList = [
  'Is cited by',
  'Cites',
  'Is supplement to',
  'Is supplemented by',
  'Is continued by',
  'Continues',
  'Is described by',
  'Describes',
  'Has metadata',
  'Is metadata for',
  'Has version',
  'Is version of',
  'Is new version of',
  'Is previous version of',
  'Is part of',
  'Has part',
  'Is published in',
  'Is referenced by',
  'References',
  'Is documented by',
  'Documents',
  'Is compiled by',
  'Compiles',
  'Is variant form of',
  'Is original form of',
  'Is identical to',
  'Is reviewed by',
  'Reviews',
  'Is derived from',
  'Is source of',
  'Is required by',
  'Requires',
  'Is obsoleted by',
  'Obsoletes',
  'Is collected by',
  'Collects',
  'Is translation of',
  'Has translation'
];

const relatedIdentifierTypeList = [
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

const resourceTypeGeneralList = [
  'Audiovisual',
  'Award',
  'Book',
  'BookChapter',
  'Collection',
  'ComputationalNotebook',
  'ConferencePaper',
  'ConferenceProceeding',
  'DataPaper',
  'Dataset',
  'Dissertation',
  'Event',
  'Image',
  'Instrument',
  'InteractiveResource',
  'Journal',
  'JournalArticle',
  'Model',
  'OutputManagementPlan',
  'PeerReview',
  'PhysicalObject',
  'Preprint',
  'Project',
  'Report',
  'Service',
  'Software',
  'Sound',
  'Standard',
  'StudyRegistration',
  'Text',
  'Workflow',
  'Other'
];

export default class DoiRelatedIdentifier extends Component {
  @service
  store;

  relationTypeList = relationTypeList;
  relationTypes = relationTypeList;
  relatedIdentifierTypeList = relatedIdentifierTypeList;
  relatedIdentifierTypes = relatedIdentifierTypeList;
  controlledIdentifierType = false;
  isMetadataRelationType = false;
  resourceTypeGeneralList = resourceTypeGeneralList;
  resourceTypesGeneral = resourceTypeGeneralList;

  constructor(...args) {
    super(...args);

    this.isMetadataRelationTypes = this.isMetadataRelationTypes || [
      'HasMetadata',
      'IsMetadataFor'
    ];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (
      relatedIdentifierTypeList.includes(
        this.fragment.relatedIdentifierType
      )
    ) {
      this.controlledIdentifierType = true;
    } else {
      this.controlledIdentifierType = false;
    }
    if (
      this.isMetadataRelationTypes.includes(this.fragment.relationType)
    ) {
      this.isMetadataRelationType = true;
    } else {
      this.isMetadataRelationType = false;
    }
  }

  updateRelatedIdentifier(value) {
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
        this.fragment.relatedIdentifier = null;
        this.fragment.relatedIdentifierType = null;
        this.controlledIdentifierType = false;
        this.selectResourceTypeGeneral(null);
        this.fragment.schemeType = null;
        this.fragment.relatedMetadataScheme = null;
        this.fragment.relationType = null;
        break;
      case ark.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'ARK';
        this.controlledIdentifierType = true;
        break;
      case arxiv.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'arXiv';
        this.controlledIdentifierType = true;
        break;
      case doi.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'DOI';
        this.controlledIdentifierType = true;
        break;
      case doiUrl.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'DOI';
        this.controlledIdentifierType = true;
        break;
      case bibcode.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'bibcode';
        this.controlledIdentifierType = true;
        break;
      case lsid.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'LSID';
        this.controlledIdentifierType = true;
        break;
      case isURL(value, purl):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'PURL';
        this.controlledIdentifierType = true;
        break;
      case urn.test(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'URN';
        this.controlledIdentifierType = true;
        break;
      case rrid.test(value):
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', 'RRID');
        this.set('controlledIdentifierType', true);
        break;
      case isISBN(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'ISBN';
        this.controlledIdentifierType = true;
        break;
      // // EAN currently not supported https://github.com/validatorjs/validator.js/issues/797
      // case isEAN(value):
      //   this.fragment.relatedIdentifier', value);
      //   this.fragment.relatedIdentifierType', 'EAN13');
      //   this.controlledIdentifierType', true);
      //   break;
      case isURL(value):
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = 'URL';
        this.controlledIdentifierType = true;
        break;
      default:
        // // Clears the relatedIdentifierType in case the user changes the relatedIdentifier after selecting it once before.
        this.fragment.relatedIdentifier = value;
        this.fragment.relatedIdentifierType = null;
        this.fragment.relationType = null;
        this.controlledIdentifierType = false;
        break;
    }
  }

  selectRelationType(relationType) {
    const selectedRelationType = relationType ? pascalCase(relationType) : null;
    if (this.isMetadataRelationTypes.includes(selectedRelationType)) {
      this.isMetadataRelationType = true;
    } else {
      this.isMetadataRelationType = false;
      this.fragment.schemeType = null;
      this.fragment.relatedMetadataScheme = null;
      this.fragment.schemeUri = null;
    }
    this.fragment.relationType = selectedRelationType;
    this.relationTypes = relationTypeList;
  }

  selectRelatedIdentifierType(relatedIdentifierType) {
    this.fragment.relatedIdentifierType = relatedIdentifierType;
    this.relatedIdentifierTypes = relatedIdentifierTypeList;
  }

  selectResourceTypeGeneral(resourceTypeGeneral) {
    const selectedResourceTypeGeneral = resourceTypeGeneral ? pascalCase(resourceTypeGeneral) : null;
    this.fragment.resourceTypeGeneral = selectedResourceTypeGeneral;
    this.resourceTypesGeneral = resourceTypeGeneralList;
  }

  @action
  updateRelatedIdentifierAction(value) {
    this.updateRelatedIdentifier(value.trim());
  }

  @action
  updateRelatedMetadataSchemeAction(value) {
    this.fragment.relatedMetadataScheme = value;
  }

  @action
  updateSchemeURIAction(value) {
    this.fragment.schemeUri = value;
  }

  @action
  updateSchemeTypeAction(value) {
    this.fragment.schemeType = value;
  }

  @action
  selectRelationTypeAction(relationType) {
    this.selectRelationType(relationType);
  }

  @action
  selectRelatedIdentifierTypeAction(relatedIdentifierType) {
    this.selectRelatedIdentifierType(relatedIdentifierType);
  }

  @action
  selectResourceTypeGeneralAction(resourceTypeGeneral) {
    this.selectResourceTypeGeneral(resourceTypeGeneral);
  }

  @action
  deleteRelatedIdentifierAction() {
    this.model.relatedIdentifiers.removeObject(this.fragment);
  }
}
