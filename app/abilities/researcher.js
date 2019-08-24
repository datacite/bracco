import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canUpdate: computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
      case 'client_admin':
      case 'user':
        return this.get('currentUser.uid') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
      case 'client_admin':
      case 'user':
        return this.get('currentUser.uid') === this.get('model.id');
      default:
        return false;
    }
  })
});
