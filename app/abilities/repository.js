import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canSource: equal('currentUser.role_id', 'staff_admin'),

  canDelete: computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,memberType,consortium.id}',
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
    'currentUser.{role_id,provider_id,provider.hasRequiredContacts}',
    'model.provider.{id,memberType,consortium.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
              this.get('model.provider.consortium.id') &&
            this.get('currentUser.provider.hasRequiredContacts')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
              this.get('model.provider.id') &&
            this.get('currentUser.provider.hasRequiredContacts')
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
    'currentUser.{role_id,provider_id,client_id}',
    'model.{id,provider.id,provider.consortium.id}',
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
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,consortium.id}',
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
