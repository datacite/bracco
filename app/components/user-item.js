import Ember from 'ember';

const roles = [{ 'id': 'staff_admin', 'name': "Staff admin" },
               { 'id': 'provider_admin', 'name': "Provider admin" },
               { 'id': 'client_admin', 'name': "Client admin" },
               { 'id': 'user', 'name': 'User' }];

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['panel', 'panel-default'],

  edit: false,
  user: null,
  role: { 'id': 'user', 'name': 'User' },
  roles: roles,
  provider: null,
  providers: [],
  client: null,
  clients: [],

  showProviders: false,
  showClients: false,

  selectRole(role) {
    this.get('user').set('role', role.id);
    //this.set('role', role);
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
    this.get('user').set('provider', provider);
    console.log(this.get('user').get('provider'))
    this.set('showClients', Ember.String.w("client_admin").includes(this.get('role.id')));
  },
  selectClient(client) {
    //this.set('client', this.get('store').peekRecord('client', client.id));
    this.get('user').set('client', client);
  },

  actions: {
    edit: function(user) {
      this.set('edit', true);
      this.set('user', user);
      //this.selectRole(user.get('role'));
      if (this.get('showProviders')) {
        //this.selectProvider(user.get('provider').get('id'));
        this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      }
      if (this.get('showClients')) {
        this.set('clients', this.get('store').query('client', { 'page[size]': 10 }));
      }
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
