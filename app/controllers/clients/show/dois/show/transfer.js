import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  currentUser: service(),
  store: service(),

  clients: null,
  oldClient: null,

  init: function () {
    this._super(...arguments);

    this.searchClient(null);
  },

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('provider_id'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectClient(client) {
    this.set('oldClient', this.get('model').get('client'));

    this.set('isDisabled', client.id === this.get('oldClient.id'));
    this.set('client', client)
    this.get('doi').set('client', client);
    this.get('doi').set('provider', client.get('provider'));
  },

  actions: {
    transfer(doi) {
      this.set('doi', doi);
      this.get('doi').set('confirmDoi', doi.get('doi'));
      this.get('doi').set('xml', null);
      this.set('oldClient', this.get('doi').get('client'));
      this.searchClient(null);
      this.set('transfer', true);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit(doi) {    
      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('clients.show.dois.show', doi.client.id, doi);
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois.show', this.get('model').get('client').get('id'), this.get('model'));
    }
  }
});