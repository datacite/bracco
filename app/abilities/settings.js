import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: Ember.computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'staff_user':
      case 'provider_admin':
      case 'provider_user':
      case 'client_admin':
      case 'client_user':
        return true;
      default:
        return false;
    }
  })
});
