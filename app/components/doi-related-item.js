import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
/* eslint-disable no-useless-escape */
import Component from '@ember/component';
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
  'Collects'
];

const relatedItemTypeList = [
  'Audiovisual',
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
export default class DoiRelatedItem extends Component {
  @service
  store;

  relationTypeList = relationTypeList;
  relationTypes = relationTypeList;
  relatedItemTypeList = relatedItemTypeList;
  relatedItemTypes = relatedItemTypeList;
  showRelatedItemCreators = false;
  showRelatedItemContributors = false;

  init(...args) {
    super.init(...args);

    this.isMetadataRelationTypes = this.isMetadataRelationTypes || [
      'HasMetadata',
      'IsMetadataFor'
    ];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.fragment.get('relatedItemIdentifier')) {
      this.fragment.set('relatedIdentifier', {});
      // this.fragment.get('relatedIdentifier').createFragment();
    }

    if (!this.fragment.get('titles')) {
      this.fragment.set('titles', []);
    }
    if (this.fragment.get('titles').length == 0) {
      this.fragment.get('titles').createFragment();
    }

    if (!this.fragment.get('creators')) {
      this.fragment.set('creators', []);
    }

    if (!this.fragment.get('contributors')) {
      this.fragment.set('contributors', []);
    }
  }

  selectRelationType(relationType) {
    if (this.isMetadataRelationTypes.includes(relationType)) {
      this.set('isMetadataRelationType', true);
    } else {
      this.set('isMetadataRelationType', false);
      this.fragment.set('schemeType', null);
      this.fragment.set('relatedMetadataScheme', null);
      this.fragment.set('schemeUri', null);
    }
    if (relationType) {
      this.fragment.set('relationType', pascalCase(relationType));
    } else {
      this.fragment.set('relationType', null);
    }
    this.set('relationTypes', relationTypeList);
  }

  selectRelatedItemType(relatedItemType) {
    if (relatedItemType) {
      this.fragment.set('relatedItemType', pascalCase(relatedItemType));
    } else {
      this.fragment.set('relatedItemType', null);
    }
    this.set('relatedItemTypes', relatedItemTypeList);
  }

  @action
  updateRelatedItemTitleAction(value) {
    this.fragment.set('titles', [{ title: value }]);
  }

  @action
  updateRelatedItemVolumeAction(value) {
    this.fragment.set('volume', value);
  }

  @action
  updateRelatedItemIssueAction(value) {
    this.fragment.set('issue', value);
  }

  @action
  updateRelatedItemNumberAction(value) {
    this.fragment.set('number', value);
  }

  @action
  updateRelatedItemPublicationYearAction(value) {
    this.fragment.set('publicationYear', value);
  }

  @action
  selectRelationTypeAction(relationType) {
    this.selectRelationType(relationType);
  }

  @action
  selectRelatedItemTypeAction(relatedItemType) {
    this.selectRelatedItemType(relatedItemType);
  }

  @action
  deleteRelatedItemAction() {
    this.model.get('relatedItems').removeObject(this.fragment);
  }

  @action
  addRelatedItemCreatorAction() {
    this.fragment.get('creators').createFragment();
    this.set('showRelatedItemCreators', true);
  }

  @action
  toggleRelatedItemCreatorsAction() {
    this.set('showRelatedItemCreators', !this.showRelatedItemCreators);
  }

  @action
  addRelatedItemContributorAction() {
    this.fragment.get('contributors').createFragment();
    this.set('showRelatedItemContributors', true);
  }

  @action
  toggleRelatedItemContributorsAction() {
    this.set(
      'showRelatedItemContributors',
      !this.showRelatedItemContributors
    );
  }
}
