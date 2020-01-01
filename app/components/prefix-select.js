import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  prefixes: [],

  searchPrefix(query) {
    if (this.repository) {
      this.set('prefixes', this.store.query('prefix', { query, 'provider-id': this.repository.get('provider').get('id'), state: 'without-client', sort: 'name', 'page[size]': 25 }));
    } else {
      this.set('prefixes', this.store.query('prefix', { query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
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
      this.model.set('prefix', prefix);
    },
  },
});
