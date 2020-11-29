import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canCreate: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canDelete: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'consortium_admin':
        return (
          this.get('currentUser.provider_id') ===
          this.get('model.consortium.id')
        );
      default:
        return false;
    }
  }),
  canUpdate: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'model.id',
    'model.memberType',
    'model.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') === this.get('model.id') ||
            this.get('currentUser.provider_id') ===
              this.get('model.consortium.id')
          );
        case 'provider_admin':
          return this.get('currentUser.provider_id') === this.get('model.id');
        default:
          return false;
      }
    }
  ),
  canToken: computed('currentUser.role_id', 'model.provider_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return (
          this.get('model.id') === 'globus' ||
          this.get('model.id') === 'datacite'
        );
      default:
        return false;
    }
  }),
  canRead: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'model.id',
    'model.memberType',
    'model.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') === this.get('model.id') ||
            this.get('currentUser.provider_id') ===
              this.get('model.consortium.id')
          );
        case 'provider_admin':
          return this.get('currentUser.provider_id') === this.get('model.id');
        default:
          return false;
      }
    }
  )
});
