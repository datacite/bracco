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
    if (this.get('client')) {
      this.set('users', this.get('store').query('user', { 'query': query, 'client-id': this.get('client').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else if (this.get('provider')) {
      this.set('users', this.get('store').query('user', { 'query': query, 'provider-id': this.get('provider').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else {
      this.set('users', this.get('store').query('user', { 'query': query, sort: 'name', 'page[size]': 10 }));
    }
  },
  selectUser(user) {
    this.set('user', user);
    this.selectRole(this.get('user.role'));
    if (this.get('client')) {
      this.searchClient(null);
      this.selectClient(this.get('client'));
    }
  },
  searchRole() {
    if (this.get('client')) {
      this.set('roles', this.get('store').query('role', { scope: 'client' }));
    } else if (this.get('provider')) {
      this.set('roles', this.get('store').query('role', { scope: 'provider' }));
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
    this.set('client', client)
    this.get('user').set('client', client);
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
        this.get('user').save().then(function(user) {
          self.get('router').transitionTo('clients.show.users', user.get('client'));
        });
      } else if (this.get('provider')) {
        this.get('user').set('provider', this.get('provider'));
        this.get('user').save().then(function(user) {
          self.get('router').transitionTo('providers.show.users', user.get('provider'));
        });
      }
    },
    cancel() {
      if (this.get('client')) {
        this.get('router').transitionTo('clients.show.users', this.get('client'));
      } else if (this.get('provider')) {
        this.get('router').transitionTo('providers.show.users', this.get('provider'));
      }
    }
  }
});
