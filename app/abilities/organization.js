import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canCreate: computed('currentUser.role_id', 'currentUser.provider_id', 'model.organizations.query.consortium-lead-id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.organizations.query.consortium-lead-id');
      default:
        return false;
    }
  }),
  canDelete: computed('currentUser.role_id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: computed('currentUser.role_id', 'currentUser.provider_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      default:
        return false;
    }
  }),
  canRead: computed('currentUser.role_id', 'currentUser.provider_id', 'model.id', function() {
    switch(this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      default:
        return false;
    }
  })
});
