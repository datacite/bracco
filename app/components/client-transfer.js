import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  intl: service(),

  tagName: 'div',
  classNames: ['row'],
  provider: null,
  client: null,
  clients: [],
  isDisabled: true,

  didReceiveAttrs() {
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
    this.set('client', client)
    this.set('isDisabled', (client === null) || (client.id === this.get('model.id')));
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
      this.get('flashMessages').success(this.get('intl').formatNumber(this.get('model').get('totalDoiCount')) + ' DOIs transferred. It can take up to 8 hours until these changes are indexed and show up outside of DOI Fabrica.', {
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
