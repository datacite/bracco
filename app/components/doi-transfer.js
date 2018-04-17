import Component from '@ember/component';
import Ember from 'ember';
const { service } = Ember.inject;

export default Component.extend({
  currentUser: service(),
  store: service(),

  oldClient: null,
  clients: null,
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('model').set('mode', 'transfer');

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
    this.get('model').set('client', client);
    this.get('model').set('provider', client.get('provider'));

    this.set('isDisabled', client.id === this.get('oldClient.id'));
  },

  actions: {
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit(doi) {    
      let self = this;
      doi.save().then(function(doi) {
        self.get('router').transitionTo('clients.show.dois.show', doi.get('client').get('id'), doi);
      });
    },
    cancel() {
      this.get('router').transitionTo('clients.show.dois.show', this.get('model').get('client').get('id'), this.get('model'));
    }
  }
});
