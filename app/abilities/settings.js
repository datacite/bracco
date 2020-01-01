import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canWrite: computed('currentUser.role_id', function() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canRead: computed('currentUser.role_id', function() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
});
