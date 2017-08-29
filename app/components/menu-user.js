import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('currentUser').get('isAuthenticated');
  }),

  didInsertElement: function() {
    this.set('currentUser', this.get('currentUser'));
  }
});
