import Ember from 'ember';
import Component from '@ember/component';
const { service } = Ember.inject;

export default Component.extend({
  store: service(),

  classNames: ['form-group'],

  resourceType: null,
  resourceTypes: [],

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchResourceType(null);
  },

  searchResourceType(query) {
    this.set('resourceTypes', this.get('store').query('resource-type', { 'query': query, sort: 'name' }));
  },
  selectResourceType(resourceType) {
    this.set('resourceType', resourceType)
    this.get('model').set('resource-type', resourceType);
  },

  actions: {
    selectResourceType(resourceType) {
      this.selectResourceType(resourceType);
    },
    searchResourceType(query) {
      this.searchResourceType(query);
    }
  }
});