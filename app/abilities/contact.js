import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import isAbleTo from '../utils/is-able-to';

export default Ability.extend({
  currentUser: service(),

  // Returns the total nuymber of contacts owned by the given contact's provider.
  // We need this because the relationships are async so we need to resolve a promise.
  async count_provider_contacts(this) {
    var x =  await this.get('model.provider.contacts');
    var n = x.length
    return n;
  },
  

  canDelete: computed(
    'currentUser.{role_id,provider_id}',
    'model.roleName',
    'model.provider.{id,memberType,consortium.id,contacts}',
    function () {
      if (
        (this.get('model.roleName') && this.get('model.roleName').length > 0) ||
        (this.get('model.provider.contacts') &&
          this.count_provider_contacts(this) == 1)
      ) {
        return false;
      } else {
        switch (this.get('currentUser.role_id')) {
          case 'staff_admin':
            return true;
          case 'consortium_admin':
            return isAbleTo(this);
          case 'provider_admin':
            return (
              this.get('currentUser.provider_id') ===
              this.get('model.provider.id')
            );
          default:
            return false;
        }
      }
    }
  ),
  canCreate: computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,memberType,consortium.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return isAbleTo(this);
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.id')
          );
        default:
          return false;
      }
    }
  ),
  canUpdate: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{id,provider.id,provider.memberType,provider.consortium.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return isAbleTo(this);
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.id')
          );
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{id,provider.id,provider.consortium.id,provider.memberType}',
    function () {
      this.get('currentUser.role_id');
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return isAbleTo(this);
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.id')
          );
        default:
          return false;
      }
    }
  )
});
