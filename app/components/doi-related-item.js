// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { pascalCase } from 'pascal-case';
import { tracked } from '@glimmer/tracking';

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

export default class DoiRelatedItem extends Component {
  @service
  store;

  relationTypeList = relationTypeList;
  relationTypes = relationTypeList;
  relatedItemTypeList = relatedItemTypeList;
  relatedItemTypes = relatedItemTypeList;
  showRelatedItemCreators = false;
  showRelatedItemContributors = false;

  constructor(...args) {
    super(...args);

    this.isMetadataRelationTypes = this.isMetadataRelationTypes || [
      'HasMetadata',
      'IsMetadataFor'
    ];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.fragment.relatedItemIdentifier) {
      this.fragment.relatedIdentifier = {};
      // this.fragment.relatedIdentifier').createFragment();
    }

    if (!this.fragment.titles) {
      this.fragment.titles = [];
    }
    if (this.fragment.titles.length == 0) {
      this.fragment.titles.createFragment();
    }

    if (!this.fragment.creators) {
      this.fragment.creators = [];
    }

    if (!this.fragment.contributors) {
      this.fragment.contributors = [];
    }
  }

  selectRelationType(relationType) {
    if (this.isMetadataRelationTypes.includes(relationType)) {
      this.isMetadataRelationType = true;
    } else {
      this.isMetadataRelationType = false;
      this.fragment.schemeType = null;
      this.fragment.relatedMetadataScheme = null;
      this.fragment.schemeUri = null;
    }
    if (relationType) {
      this.fragment.relationType = pascalCase(relationType);
    } else {
      this.fragment.relationType = null;
    }
    this.relationTypes = relationTypeList;
  }

  selectRelatedItemType(relatedItemType) {
    if (relatedItemType) {
      this.fragment.relatedItemType = pascalCase(relatedItemType);
    } else {
      this.fragment.relatedItemType = null;
    }
    this.relatedItemTypes = relatedItemTypeList;
  }

  @action
  updateRelatedItemTitleAction(value) {
    this.fragment.titles = [{ title: value }];
  }

  @action
  updateRelatedItemVolumeAction(value) {
    this.fragment.volume = value;
  }

  @action
  updateRelatedItemIssueAction(value) {
    this.fragment.issue = value;
  }

  @action
  updateRelatedItemNumberAction(value) {
    this.fragment.number = value;
  }

  @action
  updateRelatedItemPublicationYearAction(value) {
    this.fragment.publicationYear = value;
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
    this.model.relatedItems.removeObject(this.fragment);
  }

  @action
  addRelatedItemCreatorAction() {
    this.fragment.creators.createFragment();
    this.set('showRelatedItemCreators', true);
  }

  @action
  toggleRelatedItemCreatorsAction() {
    this.showRelatedItemCreators =!this.showRelatedItemCreators;
  }

  @action
  addRelatedItemContributorAction() {
    this.fragment.contributors.createFragment();
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
