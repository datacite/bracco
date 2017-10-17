import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  intl: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  client: null,
  clients: [],

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchClient(null);
  },

  searchClient(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('currentUser').get('providerId'), sort: 'name', 'page[size]': 25 }));
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.get('model').set('targetId', client.id);
  },

  actions: {
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit() {
      this.get('model').save();
      this.get('flashMessages').success(this.get('intl').formatNumber(this.get('model').get('totalDoiCount')) + ' DOIs transferred successfully. It can take up to 4 hours until these changes are indexed and show up in DOI Fabrica.', {
        timeout: 5000,
        sticky: true
      });
      this.get('router').transitionTo('clients.show.settings', this.get('model'));
    },
    cancel() {
      this.get('router').transitionTo('clients.show.dois', this.get('model'));
    }
  }
});
