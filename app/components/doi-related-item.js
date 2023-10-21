/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
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
  'Is identical to'
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
  'Text',
  'Workflow',
  'Other'
];

export default Component.extend({
  store: service(),
  relationTypeList,
  relationTypes: relationTypeList,
  relatedItemTypeList,
  relatedItemTypes: relatedItemTypeList,
  showRelatedItemCreators: false,
  showRelatedItemContributors: false,

  init(...args) {
    this._super(...args);

    this.isMetadataRelationTypes = this.isMetadataRelationTypes || [
      'HasMetadata',
      'IsMetadataFor'
    ];
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if(!this.fragment.get('relatedItemIdentifier')) {
      this.fragment.set('relatedIdentifier', {})
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
  },
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
    }
    else {
      this.fragment.set('relationType', null)
    }
    this.set('relationTypes', relationTypeList);
  },
  selectRelatedItemType(relatedItemType) {
    if (relatedItemType) {
      this.fragment.set('relatedItemType', pascalCase(relatedItemType));
    }
    else {
      this.fragment.set('relatedItemType', null)
    }
    this.set('relatedItemTypes', relatedItemTypeList);
  },
  actions: {
    updateRelatedItemTitle(value) {
      this.fragment.set('titles', [{title: value}]);
    },
    updateRelatedItemVolume(value) {
      this.fragment.set('volume', value);
    },
    updateRelatedItemIssue(value) {
      this.fragment.set('issue', value);
    },
    updateRelatedItemNumber(value) {
      this.fragment.set('number', value);
    },
    updateRelatedItemPublicationYear(value) {
      this.fragment.set('publicationYear', value);
    },
    selectRelationType(relationType) {
      this.selectRelationType(relationType);
    },
    selectRelatedItemType(relatedItemType) {
      this.selectRelatedItemType(relatedItemType);
    },
    deleteRelatedItem() {
      this.model.get('relatedItems').removeObject(this.fragment);
    },
    addRelatedItemCreator() {
      this.fragment.get('creators').createFragment();
      this.set('showRelatedItemCreators', true);
    },
    toggleRelatedItemCreators() {
      this.set('showRelatedItemCreators', !this.showRelatedItemCreators);
    },
    addRelatedItemContributor() {
      this.fragment.get('contributors').createFragment();
      this.set('showRelatedItemContributors', true);
    },
    toggleRelatedItemContributors() {
      this.set('showRelatedItemContributors', !this.showRelatedItemContributors);
    },
  }
});
