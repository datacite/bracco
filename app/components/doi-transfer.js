import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  currentUser: service(),
  store: service(),

  oldClient: null,
  clients: null,
  isDisabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.model.set('mode', 'transfer');

    this.searchClient(null);
  },

  searchClient(query) {
    if (this.currentUser.get('isAdmin')) {
      this.set('clients', this.store.query('client', { 'query': query, sort: 'name', 'page[size]': 100 }));
    } else if (this.currentUser.get('isProvider')) {
      this.set('clients', this.store.query('client', { 'query': query, 'provider-id': this.currentUser.get('provider_id'), sort: 'name', 'page[size]': 100 }));
    }
  },
  selectClient(client) {
    this.set('oldClient', this.model.get('client'));
    this.model.set('client', client);
    this.model.set('provider', client.get('provider'));

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
        self.router.transitionTo('clients.show.dois.show', doi.get('client').get('id'), doi);
      });
    },
    cancel() {
      this.router.transitionTo('clients.show.dois.show', this.model.get('client').get('id'), this.model);
    }
  }
});
