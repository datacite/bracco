import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: Ember.computed(function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed(function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'staff_user':
        return true;
      default:
        return false;
    }
  })
});
