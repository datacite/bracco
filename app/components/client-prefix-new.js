import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  new: false,
  client: null,
  prefix: null,
  prefixes: [],

  searchPrefix(query) {
    this.set('prefixes', this.get('store').query('prefix', { query: query, 'provider-id': this.get('client').get('provider-id'), state: 'without-client', sort: 'name', 'page[size]': 10 }));
  },
  reset() {
    this.set('client', null);
    this.set('prefix', null);
    this.set('prefixes', []);
    this.set('new', false);
  },

  actions: {
    new(model) {
      let self = this;
      this.get('store').findRecord('client', model.content.query['client-id']).then(function(client) {
        self.set('client', client);
        self.searchPrefix(null);
        self.set('new', true);
      });
    },
    submit() {
      var clientPrefix = this.get('store').createRecord('clientPrefix', { client: this.get('client'), prefix: this.get('prefix') });
      clientPrefix.save();
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
