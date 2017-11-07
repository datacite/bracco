import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  doi: null,
  client: null,
  clients: [],

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('provider_id'), sort: 'name', 'page[size]': 25 }));
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.get('doi').set('client', client);
    this.get('doi').set('provider', client.get('provider'));
  },

  actions: {
    edit: function(doi) {
      this.set('doi', doi);
      this.searchClient(null);
      this.set('edit', true);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit: function(doi) {
      doi.save();
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    }
  }
});
