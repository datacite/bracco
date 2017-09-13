import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['panel', 'panel-default'],

  edit: false,
  user: null,
  role: null,
  provider: null,
  client: null,
  roles: [],
  providers: [],
  clients: [],

  searchRole: function(link) {
    if (link === 'users') {
      this.set('roles', this.get('store').findAll('role'));
    } else if (link === 'providers.show.users') {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else if (link === 'clients.show.users') {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
    }
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);
  },
  selectProvider(provider) {
    this.set('provider', provider)
    this.get('user').set('provider', provider);
  },
  selectClient(client) {
    this.set('client', client)
    this.get('user').set('client', client);
  },

  actions: {
    edit: function(user, link) {
      this.set('edit', true);
      this.set('user', user);
      this.searchRole(link);
      this.selectRole(user.get('role'));
      this.selectProvider(user.get('provider'));

      this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      if (this.get('provider').get('id')) {
        this.set('clients', this.get('store').query('client', { sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
        this.selectClient(user.get('client'));
      }
    },
    searchRole: function(link) {
      this.searchRole(link);
    },
    searchProvider: function(query) {
      this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 10 }));
    },
    searchClient: function(query) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
    },
    submit: function() {
      this.get('user').save();
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    },
    selectRole(role) {
      this.selectRole(role);
    },
    selectProvider(provider) {
      this.selectProvider(provider);
    },
    selectClient(client) {
      this.selectClient(client);
    }
  }
});
