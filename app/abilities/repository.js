import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canSource: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),

  canDelete: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'model.provider.memberType',
    'model.provider.id',
    'model.provider.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.consortium.id')
          );
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
  canCreate: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'model.provider.memberType',
    'model.provider.id',
    'model.provider.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.consortium.id')
          );
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
    'currentUser.role_id',
    'currentUser.provider_id',
    'currentUser.client_id',
    'model.id',
    'model.provider.memberType',
    'model.provider.id',
    'model.provider.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.consortium.id')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.id')
          );
        case 'client_admin':
          return this.get('currentUser.client_id') === this.get('model.id');
        default:
          return false;
      }
    }
  ),
  canToken: computed('currentUser.role_id', 'model.provider.id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return (
          this.get('model.provider.id') === 'globus' ||
          this.get('model.provider.id') === 'datacite'
        );
      case 'client_admin':
        return (
          this.get('model.provider.id') === 'globus' ||
          this.get('model.provider.id') === 'datacite'
        );
      default:
        return false;
    }
  }),
  canRead: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'currentUser.client_id',
    'model.id',
    'model.provider.id',
    'model.provider.consortium.id',
    function () {
      this.get('currentUser.role_id');
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.consortium.id')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.id')
          );
        case 'client_admin':
          return this.get('currentUser.client_id') === this.get('model.id');
        default:
          return false;
      }
    }
  ),
  canTransfer: computed(
    'currentUser.role_id',
    'currentUser.provider_id',
    'model.provider.id',
    'model.provider.consortium.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.provider.consortium.id')
          );
        default:
          return false;
      }
    }
  ),
  canMove: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  })
});
