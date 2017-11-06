import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  user: null,
  users: [],
  model: null,
  role: null,
  provider: null,
  client: null,
  disabled: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('currentUser', this.get('currentUser'));
  },

  searchUser(query) {
    this.set('users', this.get('store').query('user', { query: query, registry: true, 'page[size]': 25 }));
  },
  selectUser(user) {
    let self = this;
    this.get('store').findRecord('user', user.id, { reload: true, registry: true, include: 'role,client,provider,sandbox' }).then(function(user) {
      self.set('user', user);
      self.searchRole();

      // if (!user.get('isActive') || this.get('currentUser').get('isAdmin')) {
      //   self.set('disabled', false);
      // }
      self.set('disabled', false);

      if (self.get('model.client')) {
        self.get('store').findRecord('role', 'client_user').then(function(role) {
          self.selectRole(role);
          self.get('user').set('role', role);
          self.get('user').set('client', self.get('model.client'));
          self.get('user').set('provider', self.get('model.provider'));
        });
      } else if (self.get('model.provider')) {
        self.get('store').findRecord('role', 'provider_user').then(function(role) {
          self.selectRole(role);
          self.get('user').set('role', role);
          self.get('user').set('provider', self.get('model.provider'));
        });
      } else {
        self.selectRole(user.get('role'));
        self.selectClient(user.get('client'));

        this.searchProvider(null);
        self.selectProvider(user.get('provider'));
      }
    });
  },
  searchRole() {
    if (this.get('model.client')) {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
    } else if (this.get('model.provider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else {
      this.set('roles', this.get('store').findAll('role'));
    }
  },
  selectRole(role) {
    this.set('role', role);
    this.get('user').set('role', role);
  },
  searchProvider(query) {
    this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 25 }));
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
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
  },
  selectClient(client) {
    this.set('client', client);
    if (client) {
      if (client.get('isSandbox')) {
        this.get('user').set('sandbox-id', client.id);
      } else {
        this.get('user').set('client', client);
      }
    }
  },

  actions: {
    selectUser(user) {
      this.selectUser(user);
    },
    searchUser(query) {
      this.searchUser(query);
    },
    searchRole() {
      this.searchRole();
    },
    selectRole(role) {
      this.selectRole(role);
    },
    searchProvider(query) {
      this.searchProvider(query);
    },
    selectProvider(provider) {
      this.selectProvider(provider);
    },
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit() {
      let self = this;
      this.get('user').save().then(function(user) {
        self.get('router').transitionTo('users.show', user.id);
      });
    },
    cancel() {
      if (this.get('model.client')) {
        this.get('router').transitionTo('clients.show.users', this.get('model.client.id'));
      } else if (this.get('model.provider')) {
        this.get('router').transitionTo('providers.show.users', this.get('model.provider.id'));
      } else {
        this.get('router').transitionTo('users');
      }
    }
  }
});
