import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  new: false,
  client: null,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, 'provider-id': this.get('client').get('provider-id'), state: 'without-client', sort: 'name', 'page[size]': 10 }));
  },

  didInsertElement() {
    this._super(...arguments);

    this.set('client', this.get('model.client'));

    this.searchPrefix(null);
  },

  actions: {
    new() {
    },
    submit() {
      var clientPrefix = this.get('store').createRecord('clientPrefix', { client: this.get('client'), prefix: this.get('prefix') });
      clientPrefix.save();
      this.get('router').transitionTo('clients.show.prefixes', this.get('client'));
    },
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.set('prefix', prefix);
    },
    cancel() {
      this.get('router').transitionTo('clients.show.prefixes', this.get('client'));
    }
  }
});
