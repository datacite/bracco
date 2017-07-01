import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service('current-user'),

  didInsertElement: function() {
    let currentUser = this.get('currentUser');
    this.set('isAuthenticated', true); //currentUser.isAuthenticated());
  }
});
