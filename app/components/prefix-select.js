import Ember from 'ember';
import Component from '@ember/component';
const { service } = Ember.inject;

export default Component.extend({
  store: service(),

  prefixes: [],

  searchPrefix(query) {
    if (this.get('client')) {
      let providerId = this.get('client').get('id').split('.').get('firstObject');
      this.set('prefixes', this.get('store').query('prefix', { query: query, 'provider-id': providerId, state: 'without-client', sort: 'name', 'page[size]': 25 }));
    } else {
      this.set('prefixes', this.get('store').query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
    }
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
