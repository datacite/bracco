import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service('current-user'),
  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('currentUser').isAuthenticated;
  }),

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
