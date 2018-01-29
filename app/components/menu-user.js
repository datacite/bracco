import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),

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
