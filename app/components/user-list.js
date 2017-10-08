import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],

  new: false,
  user: null,
  users: [],
  provider: null,
  client: null,
  link: null,

  // didReceiveAttrs() {
  //   this._super(...arguments);
  //   this.set('users', this.get('store').query('user', { sort: 'name', 'page[size]': 10 }));
  // },

  searchUser(query) {
    if (this.get('link') === 'providers.show.users') {
      this.set('users', this.get('store').query('user', { 'query': query, 'provider-id': this.get('provider').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else if (this.get('link') === 'clients.show.users') {
      this.set('users', this.get('store').query('user', { 'query': query, 'client-id': this.get('client').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else {
      this.set('users', this.get('store').query('user', { 'query': query, sort: 'name', 'page[size]': 10 }));
    }

  },
  selectUser(user) {
    this.set('user', user);
    this.selectRole(this.get('user.role'));
    if (this.get('link') === 'providers.show.users') {
      this.searchClient(null);
      this.selectClient(this.get('user.client'));
    }
  },
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
  searchClient(query) {
    this.set('clients', this.get('store').query('client', { 'query': query, sort: 'name', 'provider-id': this.get('provider').get('id'), 'page[size]': 10 }));
  },
  selectClient(client) {
    this.set('client', client)
    this.get('user').set('client', client);
  },
  reset() {
    this.set('user', null);
    this.set('users', []);
    this.set('new', false);
  },

  actions: {
    new(model, link) {
      this.set('link', link);
      if (link === 'providers.show.users') {
        this.set('provider', this.get('store').peekRecord('provider', model.get('otherParams.provider-id')));
      } else if (link === 'clients.show.users') {
        this.set('client', this.get('store').peekRecord('client', model.get('otherParams.client-id')));
      }
      this.searchUser(null);
      this.searchRole();
      this.set('new', true);
    },
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
    searchClient(query) {
      this.searchClient(query);
    },
    selectClient(client) {
      this.selectClient(client);
    },
    submit() {
      if (this.get('link') === 'providers.show.users') {
        this.get('user').set('provider', this.get('provider'));
        this.get('user').save();
      } else if (this.get('link') === 'clients.show.users') {
        this.get('user').set('client', this.get('client'));
        this.get('user').save();
      }
      this.reset();
    },
    cancel() {
      this.reset();
    }
  }
});
