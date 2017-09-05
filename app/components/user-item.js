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

  searchRole: function() {
    this.set('roles', this.get('store').findAll('role'));
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);
    this.set('showProviders', Ember.String.w("provider_admin client_admin").includes(role.id));
    this.set('showClients', Ember.String.w("client_admin").includes(role.id));

    if (!this.get('showProviders')) {
      this.get('user').set('provider', null);
    }
    if (!this.get('showClients')) {
      this.get('user').set('client', null);
    }
  },
  selectProvider(provider) {
//     let post = this.store.peekRecord('post', 1);
// let comment = this.store.peekRecord('comment', 1);
// comment.set('post', post);
    //this.set('provider', this.get('store').peekRecord('provider', provider.id));
    this.set('provider', provider)
    this.get('user').set('provider', provider);
    this.set('showClients', Ember.String.w("client_admin").includes(this.get('role.id')));
  },
  selectClient(client) {
    //this.set('client', this.get('store').peekRecord('client', client.id));
    this.set('client', client)
    this.get('user').set('client', client);
  },

  actions: {
    edit: function(user) {
      this.set('edit', true);
      this.set('user', user);
      this.searchRole();
      this.selectRole(user.get('role'));
      this.selectProvider(user.get('provider'));

      if (this.get('showProviders')) {
        //this.selectProvider(user.get('provider').get('id'));
        this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      }
      if (this.get('showClients')) {
        this.set('clients', this.get('store').query('client', { 'page[size]': 10 }));
      }
    },
    searchRole: function() {
      this.searchRole();
    },
    searchProvider: function(query) {
      this.set('providers', this.get('store').query('provider', { 'query': query, 'page[size]': 10 }));
    },
    searchClient: function(query) {
      this.set('clients', this.get('store').query('client', { 'query': query, 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
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
