import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  user: null,
  users: [],
  provider: null,
  client: null,
  link: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('provider', this.get('model.provider'));
    this.set('client', this.get('model.client'));

    this.searchUser(null);
    this.searchRole();
  },

  searchUser(query) {
    this.set('users', this.get('store').query('user', { query: query, registry: true, 'page[size]': 25 }));
  },
  selectUser(user) {
    let self = this;
    this.get('store').findRecord('user', user.id, { reload: true, registry: true, include: 'role,client,provider,sandbox' }).then(function(user) {
      self.set('user', user);
      self.selectRole(self.get('user').get('role'));
      if (user.get('provider')) {
        self.selectProvider(user.get('provider'));
      }
      if (user.get('client')) {
        self.selectClient(user.get('client'))
      }
    });
  },
  searchRole() {
    if (this.get('client')) {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
    } else if (this.get('provider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
    } else {
      this.set('roles', this.get('store').findAll('role'));
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
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
  },
  selectClient(client) {
    if (client) {
      this.set('client', client)
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
      this.set('providers', this.get('store').query('provider', { 'query': query, sort: 'name', 'page[size]': 10 }));
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
      if (this.get('client')) {
        this.get('user').set('client', this.get('client'));
      }
      if (this.get('provider')) {
        this.get('user').set('provider', this.get('provider'));
      }
      this.get('user').save().then(function(user) {
        self.get('router').transitionTo('users.show', user.id);
      });
    },
    cancel() {
      if (this.get('client')) {
        this.get('router').transitionTo('clients.show.users', this.get('client'));
      } else if (this.get('provider')) {
        this.get('router').transitionTo('providers.show.users', this.get('provider'));
      } else {
        this.get('router').transitionTo('users');
      }
    }
  }
});
