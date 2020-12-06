import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canSource: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),

  canDelete: computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,memberType,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id === this.model.provider.consortium.id
          );
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.provider.id;
        default:
          return false;
      }
    }
  ),
  canCreate: computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,memberType,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id === this.model.provider.consortium.id
          );
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.provider.id;
        default:
          return false;
      }
    }
  ),
  canUpdate: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.id',
    'model.provider.{id,memberType,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id === this.model.provider.consortium.id
          );
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.provider.id;
        case 'client_admin':
          return this.currentUser.client_id === this.model.id;
        default:
          return false;
      }
    }
  ),
  canToken: computed('currentUser.role_id', 'model.provider.id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
        return true;
      case 'provider_admin':
        return (
          this.model.provider.id === 'globus' ||
          this.model.provider.id === 'datacite'
        );
      case 'client_admin':
        return (
          this.model.provider.id === 'globus' ||
          this.model.provider.id === 'datacite'
        );
      default:
        return false;
    }
  }),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.id',
    'model.provider.{id,consortium.id}',
    function () {
      this.currentUser.role_id;
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id === this.model.provider.consortium.id
          );
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.provider.id;
        case 'client_admin':
          return this.currentUser.client_id === this.model.id;
        default:
          return false;
      }
    }
  ),
  canTransfer: computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,consortium.id}',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.currentUser.provider_id === this.model.provider.consortium.id
          );
        default:
          return false;
      }
    }
  ),
  canMove: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  })
});
