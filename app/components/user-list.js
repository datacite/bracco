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

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('users', this.get('store').query('user', { sort: 'name', 'page[size]': 10 }));
  },

  searchUser: function(query, link) {
    if (link === 'providers.show.users') {
      this.set('users', this.get('store').query('user', { 'query': query, 'provider-id': this.get('provider').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else if (link === 'clients.show.users') {
      this.set('users', this.get('store').query('user', { 'query': query, 'client-id': this.get('client').get('id'), exclude: true, sort: 'name', 'page[size]': 10 }));
    } else {
      this.set('users', this.get('store').query('user', { 'query': query, sort: 'name', 'page[size]': 10 }));
    }

  },
  reset() {
    this.set('user', null);
    this.set('users', []);
    this.set('new', false);
  },

  actions: {
    new(model, link) {
      if (link === 'providers.show.users') {
        this.set('provider', this.get('store').peekRecord('provider', model.get('otherParams.provider-id')));
      } else if (link === 'clients.show.users') {
        this.set('client', this.get('store').peekRecord('client', model.get('otherParams.client-id')));
        this.searchUser(null, link);
      }
      this.set('new', true);
    },
    selectUser(user) {
      this.set('user', user);
      this.get('user').set('provider', this.get('provider'));

      console.log(this.get('user').get('provider'))
    },
    searchUser(query) {
      this.searchUser(query);
    },
    submit() {
      this.get('user').save();
      this.reset();
    },
    cancel() {
      this.reset();
    }
  }
});
