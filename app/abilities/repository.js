import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';
import { Ability } from 'ember-can';

@classic
export default class Repository extends Ability {
  @service
  currentUser;

  @equal('currentUser.role_id', 'staff_admin')
  canSource;

  @computed(
    'currentUser.{role_id,provider_id}',
    'model.provider.{id,memberType,consortium.id}'
  )
  get canDelete() {
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

  @computed('currentUser.{role_id,provider_id}', 'model.provider.{id,consortium.id}')
  get canCreate() {
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

  @computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{id,provider.id,provider.memberType,provider.consortium.id}'
  )
  get canUpdate() {
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

  @computed('currentUser.role_id', 'model.provider.id')
  get canToken() {
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
  }

  @computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{id,provider.id,provider.consortium.id}'
  )
  get canRead() {
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

  @computed('currentUser.{role_id,provider_id}', 'model.provider.{id,consortium.id}')
  get canTransfer() {
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

  @computed('currentUser.role_id')
  get canMove() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }
}
