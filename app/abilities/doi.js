import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default class Doi extends Ability {
  @service
  currentUser;

  @computed('currentUser.role_id')
  get canViewHealth() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }

  @computed('currentUser.role_id')
  get canViewState() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
      case 'client_admin':
        return true;
      default:
        return false;
    }
  }

  @computed('currentUser.role_id')
  get canSource() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }

  @computed(
    'currentUser.{role_id,provider_id}',
    'model.repository.{id,provider.id,provider.consortium.id}',
    'repository.provider.{id,consortium.id}',
    'model.query.client-id'
  )
  get canTransfer() {
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

  @computed('currentUser.{role_id,provider_id}', 'repository.{id,provider.id}')
  get canMove() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
        return true; // this.get('currentUser.provider_id') === this.get('repository.provider.id');
      default:
        return false;
    }
  }

  @computed('currentUser.{role_id,client_id}', 'model.{id,repository.id}')
  get canUpdate() {
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

  @computed('currentUser.{role_id,client_id}', 'model.{id,query.client-id}')
  get canUpload() {
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

  @computed(
    'currentUser.{role_id,client_id}',
    'model.{id,query.client-id,repository.id}'
  )
  get canCreate() {
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

  @computed('currentUser.{role_id,client_id}', 'model.repository.id')
  get canDelete() {
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

  @computed('currentUser.{role_id,client_id}', 'model.repository.id')
  get canModify() {
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

  @computed('currentUser.{role_id,client_id}', 'model.repository.id')
  get canEdit() {
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

  @computed('currentUser.{role_id,client_id}', 'model.repository.id')
  get canForm() {
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

  @computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repository.id,repository.provider.id,repository.provider.consortium.id,state}'
  )
  get canDetail() {
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

  @computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repository.id,repository.provider.id,repository.provider.consortium.id,state}'
  )
  get canRead() {
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
}
