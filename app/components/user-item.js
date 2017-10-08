import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['panel', 'panel-transparent'],

  edit: false,
  delete: false,
  user: null,
  role: null,
  provider: null,
  client: null,
  roles: [],
  providers: [],
  clients: [],
  link: null,

  searchRole() {
    if (this.get('link') === 'users') {
      this.set('roles', this.get('store').findAll('role'));
    } else if (this.get('link') === 'providers.show.users') {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else if (this.get('link') === 'clients.show.users') {
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
  reset() {
    this.set('edit', false);
    this.set('delete', false);
  },

  actions: {
    edit(user, link) {
      this.set('link', link);
      this.set('edit', true);
      this.set('user', user);
      this.searchRole();
      this.selectRole(user.get('role'));
      this.selectProvider(user.get('provider'));

      this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      if (this.get('provider').get('id')) {
        this.set('clients', this.get('store').query('client', { sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
        this.selectClient(user.get('client'));
      }
    },
    delete(user, link) {
      this.set('link', link);
      if (link === 'providers.show.users') {
        user.set('provider', null);
      } else if (link === 'clients.show.users') {
        user.set('client', null);
      }
      this.set('delete', true);
    },
    searchRole() {
      this.searchRole();
    },
    searchProvider(query) {
      this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 10 }));
    },
    searchClient(query) {
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
    },
    submit() {
      this.get('user').save();
      this.reset();
    },
    destroy() {
      this.get('user').save();
      this.reset();
    },
    cancel() {
      this.reset();
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
