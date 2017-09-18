import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['row'],

  new: false,
  user: null,
  users: [],
  provider: null,

  searchUser: function(query) {
    this.set('users', this.get('store').query('user', { 'query': query, sort: 'name', 'page[size]': 10 }));
  },
  reset() {
    this.set('user', null);
    this.set('users', []);
    this.set('new', false);
  },

  actions: {
    new(model) {
      this.set('provider', this.get('store').peekRecord('provider', model.get('otherParams.provider-id')));
      this.set('new', true);
    },
    selectUser(user) {
      user.set('provider', this.get('provider'));
      this.set('user', user);
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
