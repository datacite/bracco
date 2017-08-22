import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canWrite: function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
      case 'member_admin':
      case 'data_center_admin':
        return true;
      default:
        return false;
    }
  }.property('currentUser.uid', 'user', 'canWrite'),
  canRead: function() {
    switch(this.get('currentUser.role')) {
      case 'staff_admin':
      case 'member_admin':
      case 'data_center_admin':
        return true;
      default:
        return false;
    }
  }.property('currentUser.uid', 'user', 'canRead')
});
