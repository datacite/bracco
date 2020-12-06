import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canCreate: computed(
    'currentUser.{role_id,provider_id}',
    'model.organizations.query.consortium-id',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id ===
            this.model.organizations.query['consortium-id']
          );
        default:
          return false;
      }
    }
  ),
  canDelete: computed(
    'currentUser.{role_id,provider_id}',
    'model.consortium.id',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return this.currentUser.provider_id === this.model.consortium.id;
        default:
          return false;
      }
    }
  ),
  canUpdate: computed(
    'currentUser.{role_id,provider_id}',
    'model.{id,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return this.currentUser.provider_id === this.model.consortium.id;
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.id;
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id}',
    'model.{id,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return this.currentUser.provider_id === this.model.consortium.id;
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.id;
        default:
          return false;
      }
    }
  )
});
