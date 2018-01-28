import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  tagName: 'li',
  classNameBindings: ['dropdownMenu'],
  dropdownMenu: Ember.computed(function() {
    this.get('session').get('isAuthenticated');
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
