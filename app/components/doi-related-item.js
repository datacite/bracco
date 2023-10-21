/* eslint-disable no-useless-escape */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { pascalCase } from 'pascal-case';
import { RESOURCE_TYPE_GENERAL_LIST } from '../constants/resource-type-general-list';
import { RELATION_TYPE_LIST } from '../constants/relation-type-list';

const relationTypeList = RELATION_TYPE_LIST;

const relatedItemTypeList = RESOURCE_TYPE_GENERAL_LIST;

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
