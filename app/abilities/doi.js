import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canViewHealth: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canViewState: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }),
  canSource: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }),
  canTransfer: computed(
    'currentUser.{role_id,provider_id}',
    'model.repository.{id,provider.id,provider.consortium.id}',
    'repository.provider.{id,consortium.id}',
    'model.query.client-id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
              this.get('model.repository.provider.consortium.id') ||
            this.get('currentUser.provider_id') ===
              this.get('repository.provider.consortium.id')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
              this.get('model.repository.provider.id') ||
            this.get('currentUser.provider_id') ===
              this.get('repository.provider.id')
          );
        default:
          return false;
      }
    }
  ),
  canMove: computed(
    'currentUser.{role_id,provider_id}',
    'repository.{id,provider.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
        case 'consortium_admin':
        case 'provider_admin':
          return true; // this.get('currentUser.provider_id') === this.get('repository.provider.id');
        default:
          return false;
      }
    }
  ),
  canUpdate: computed(
    'currentUser.{role_id,client_id}',
    'model.{id,repository.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
        case 'consortium_admin':
        case 'provider_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        default:
          return false;
      }
    }
  ),
  canUpload: computed(
    'currentUser.{role_id,client_id}',
    'model.{id,query.client-id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') === this.get('model.query.client-id') ||
            ((this.get('model.id') ? true : false))
          );
        default:
          return false;
      }
    }
  ),
  canCreate: computed(
    'currentUser.{role_id,client_id}',
    'model.{id,query.client-id,repository.id}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
              this.get('model.query.client-id') ||
            ((this.get('model.id') || this.get('model.repository.id') ? true : false))
          );
        default:
          return false;
      }
    }
  ),
  canDelete: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        default:
          return false;
      }
    }
  ),
  canModify: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        default:
          return false;
      }
    }
  ),
  canEdit: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        default:
          return false;
      }
    }
  ),
  canForm: computed(
    'currentUser.{role_id,client_id}',
    'model.repository.id',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'client_admin':
          return (
            this.get('currentUser.client_id') === 'demo.datacite' &&
            this.get('currentUser.client_id') ===
              this.get('model.repository.id')
          );
        default:
          return false;
      }
    }
  ),
  canDetail: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repository.id,repository.provider.id,repository.provider.consortium.id,state}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.repository.provider.consortium.id')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.repository.provider.id')
          );
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        case 'user':
          return this.get('model.state') === 'findable';
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repository.id,repository.provider.id,repository.provider.consortium.id,state}',
    function () {
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.repository.provider.consortium.id')
          );
        case 'provider_admin':
          return (
            this.get('currentUser.provider_id') ===
            this.get('model.repository.provider.id')
          );
        case 'client_admin':
          return (
            this.get('currentUser.client_id') ===
            this.get('model.repository.id')
          );
        case 'user':
          return this.get('model.state') === 'findable';
        default:
          return this.get('model.state') === 'findable';
      }
    }
  )
});
