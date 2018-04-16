import Ember from 'ember';
import Component from '@ember/component';
const { service } = Ember.inject;

export default Component.extend({
  store: service(),

  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchPrefix(null);
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.get('model').set('prefix', prefix);
    }
  }
});
