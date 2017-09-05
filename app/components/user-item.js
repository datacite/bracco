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

  showProviders: false,
  showClients: false,

  searchRole: function(link) {
    this.set('roles', this.get('store').findAll('role'));
    // console.log(link)
    // this.set('roles', this.get('store').query('role', { filter: { link: link } }));
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);

    this.set('showProviders', Ember.String.w("provider_admin client_admin user").includes(role.get('id')));
    this.set('showClients', Ember.String.w("client_admin").includes(role.get('id')));

    if (!this.get('showProviders')) {
      this.get('user').set('provider', null);
    }
    if (!this.get('showClients')) {
      this.get('user').set('client', null);
    }
  },
  selectProvider(provider) {
    this.set('provider', provider)
    this.get('user').set('provider', provider);
    this.set('showClients', Ember.String.w("client_admin").includes(this.get('user').get('id')));

    this.searchClient('');
    this.selectClient(this.get('user').get('client'));
  },
  selectClient(client) {
    this.set('client', client)
    this.get('user').set('client', client);
  },
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
  },

  actions: {
    edit: function(user, link) {
      this.set('edit', true);
      this.set('user', user);
      this.searchRole(link);
      this.selectRole(user.get('role'));
      this.selectProvider(user.get('provider'));

      if (this.get('showProviders')) {
        this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      }
      if (this.get('showClients')) {
        this.set('clients', this.get('store').query('client', { 'page[size]': 10 }));
      }
    },
    searchRole: function(link) {
      this.searchRole(link);
    },
    searchProvider: function(query) {
      this.set('providers', this.get('store').query('provider', { 'query': query, 'page[size]': 10 }));
    },
    searchClient: function(query) {
      this.searchClient(query);
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
      console.log(client)
      this.selectClient(client);
    }
  }
});
