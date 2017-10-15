import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  edit: false,
  delete: false,
  user: null,
  role: null,
  provider: null,
  client: null,
  sandbox: null,
  roles: [],
  providers: [],
  clients: [],
  sandboxes: [],

  searchRole() {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('roles', this.get('store').findAll('role'));
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else if (this.get('currentUser').get('isClient')) {
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

    if (provider) {
      this.set('clients', this.get('store').query('client', { sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
      this.selectClient(this.get('user').get('client'));
    } else {
      this.set('clients', []);
      this.selectClient(null);
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.get('user').set('client', client);
  },
  selectSandbox(sandbox) {
    this.set('sandbox', sandbox)
    this.get('user').set('sandbox', sandbox);
  },
  reset() {
    this.set('edit', false);
    this.set('delete', false);
  },

  actions: {
    edit(user) {
      this.set('edit', true);
      this.set('user', user);
      this.searchRole();
      this.selectRole(user.get('role'));
      this.selectProvider(user.get('provider'));

      this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));

      if (this.get('provider').get('id') === 'sandbox') {
        this.set('sandboxes', this.get('store').query('client', { sort: 'name', 'provider-id': 'sandbox', 'page[size]': 25 }));
        this.selectSandbox(user.get('sandbox'));
      } else if (this.get('provider').get('id')) {
        this.set('clients', this.get('store').query('client', { sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 25 }));
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
      this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 25 }));
    },
    searchSandbox(query) {
      this.set('sandboxes', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': 'sandbox', 'page[size]': 25 }));
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
