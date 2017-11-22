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
  isAdmin: false,
  isProvider: false,
  isClient: false,
  isUser: false,
  currentUser: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('currentUser', this.get('currentUser'));
  },

  searchRole() {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('roles', this.get('store').findAll('role'));
      this.set('isAdmin', true);
    } else if (this.get('currentUser').get('isProvider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
      this.set('isProvider', true);
    } else if (this.get('currentUser').get('isClient')) {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
      this.set('isClient', true);
    } else {
      this.set('roles', []);
      this.set('isUser', true);
    }
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);

    if (role.id === 'user') {
      this.set('providers', []);
      this.set('provider', null);
      this.get('user').set('provider', null);

      this.set('client', null);
      this.get('user').set('client', null);

      this.set('isUser', true);
    } else {
      this.set('isUser', false);
    }
  },
  searchProvider(query) {
    if (this.get('currentUser').get('isAdmin')) {
      this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 25 }));
    } else if (this.get('currentUser').get('provider_id')) {
      let provider = this.get('store').findRecord('provider', this.get('currentUser').get('provider_id'));
      this.set('providers', [provider]);
    }
  },
  selectProvider(provider) {
    this.set('provider', provider)
    this.get('user').set('provider', provider);

    if (provider) {
      this.searchClient(null);
    } else {
      this.set('clients', []);
      this.selectClient(null);
    }
  },
  selectClient(client) {
    this.set('client', client)
    this.get('user').set('client', client);
  },
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { query: query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 25 }));
  },
  searchSandbox(query) {
    this.set('sandboxes', this.get('store').query('client', { query: query, sort: 'name', 'provider-id': 'sandbox', 'page[size]': 25 }));
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

      this.searchProvider(null);
      this.selectProvider(user.get('provider'));

      if (this.get('provider') && this.get('provider').get('id') === 'sandbox') {
        this.searchSandbox(null);
        this.selectSandbox(user.get('sandbox'));
      } else if (this.get('provider') && this.get('provider').get('id')) {
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
      this.searchProvider(query)
    },
    searchClient(query) {
      this.searchClient(query)
    },
    searchSandbox(query) {
      this.searchSandbox(query)
    },
    selectSandbox(sandbox) {
      this.selectSandbox(sandbox);
    },
    submit() {
      let self = this;
      this.get('user').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    destroy() {
      let self = this;
      this.get('user').save().then(function () {
        self.reset();
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
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
