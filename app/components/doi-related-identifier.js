import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { isURL, isISBN } from 'validator';
import { isBlank } from '@ember/utils';
import { pascalCase } from 'pascal-case';

const relationTypeList = [
  'Cites',
  'Is cited by',
  'Compiles',
  'Is compiled by',
  'Continues',
  'Is continued by',
  'Describes',
  'Is described by',
  'Documents',
  'Is documented by',
  'Is derived from',
  'Is source of',
  'Has metadata',
  'Is metadata for',
  'Has part',
  'Is part of',
  'Is supplemented by',
  'Is supplement to',
  'Obsoletes',
  'Is obsoleted by',
  'References',
  'Is referenced by',
  'Requires',
  'Is required by',
  'Reviews',
  'Is reviewed by',
  'Has version',
  'Is version of',
  'Is new version of',
  'Is previous version of',
  'Is published in',
  'Is variant form of',
  'Is original form of',
  'Is identical to',
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

@classic
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

  init(...args) {
    super.init(...args);

    this.isMetadataRelationTypes = this.isMetadataRelationTypes || [
      'HasMetadata',
      'IsMetadataFor'
    ];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (
      relatedIdentifierTypeList.includes(
        this.fragment.get('relatedIdentifierType')
      )
    ) {
      this.set('controlledIdentifierType', true);
    } else {
      this.set('controlledIdentifierType', false);
    }
    if (
      this.isMetadataRelationTypes.includes(this.fragment.get('relationType'))
    ) {
      this.set('isMetadataRelationType', true);
    } else {
      this.set('isMetadataRelationType', false);
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

    switch (true) {
      case isBlank(value):
        this.fragment.set('relatedIdentifier', null);
        this.fragment.set('relatedIdentifierType', null);
        this.set('controlledIdentifierType', false);
        this.selectResourceTypeGeneral(null);
        this.fragment.set('schemeType', null);
        this.fragment.set('relatedMetadataScheme', null);
        this.fragment.set('relationType', null);
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
      case doiUrl.test(value):
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
      case isURL(value, purl):
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
        // // Clears the relatedIdentifierType in case the user changes the relatedIdentifier after selecting it once before.
        this.fragment.set('relatedIdentifier', value);
        this.fragment.set('relatedIdentifierType', null);
        this.fragment.set('relationType', null);
        this.set('controlledIdentifierType', false);
        break;
    }
  }

  selectRelationType(relationType) {
    const selectedRelationType = relationType ? pascalCase(relationType) : null;
    if (this.isMetadataRelationTypes.includes(selectedRelationType)) {
      this.set('isMetadataRelationType', true);
    } else {
      this.set('isMetadataRelationType', false);
      this.fragment.set('schemeType', null);
      this.fragment.set('relatedMetadataScheme', null);
      this.fragment.set('schemeUri', null);
    }
    this.fragment.set('relationType', selectedRelationType);
    this.set('relationTypes', relationTypeList);
  }

  selectRelatedIdentifierType(relatedIdentifierType) {
    this.fragment.set('relatedIdentifierType', relatedIdentifierType);
    this.set('relatedIdentifierTypes', relatedIdentifierTypeList);
  }

  selectResourceTypeGeneral(resourceTypeGeneral) {
    const selectedResourceTypeGeneral = resourceTypeGeneral ? pascalCase(resourceTypeGeneral) : null;
    this.fragment.set('resourceTypeGeneral', selectedResourceTypeGeneral);
    this.set('resourceTypesGeneral', resourceTypeGeneralList);
  }

  @action
  updateRelatedIdentifierAction(value) {
    this.updateRelatedIdentifier(value.trim());
  }

  @action
  updateRelatedMetadataSchemeAction(value) {
    this.fragment.set('relatedMetadataScheme', value);
  }

  @action
  updateSchemeURIAction(value) {
    this.fragment.set('schemeUri', value);
  }

  @action
  updateSchemeTypeAction(value) {
    this.fragment.set('schemeType', value);
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
    this.model.get('relatedIdentifiers').removeObject(this.fragment);
  }
}
