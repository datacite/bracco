import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  provider: null,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 10 }));
  },
  reset() {
    this.set('provider', null);
    this.set('prefix', null);
    this.set('prefixes', []);
    this.set('new', false);
  },

  actions: {
    new(model) {
      this.set('provider', this.get('store').findRecord('provider', model.content.query['provider-id']));
      this.searchPrefix(null);
      this.set('new', true);
    },
    submit() {
      var providerPrefix = this.get('store').createRecord('providerPrefix', { provider: this.get('provider'), prefix: this.get('prefix') });
      providerPrefix.save();
      this.reset();
    },
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.set('prefix', prefix);
    },
    cancel() {
      this.reset();
    }
  }
});
