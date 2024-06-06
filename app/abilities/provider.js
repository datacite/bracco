import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

@classic
export default class Provider extends Ability {
  @service
  currentUser;

  @computed('currentUser.role_id')
  get canCreate() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }

  @computed('currentUser.{role_id,provider_id}', 'model.consortium.id')
  get canDelete() {
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
  }

  @computed('currentUser.{role_id,provider_id}', 'model.{id,memberType,consortium.id}')
  get canUpdate() {
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

  @computed('currentUser.role_id', 'model.{id,provider_id}')
  get canToken() {
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
  }

  @computed('currentUser.{role_id,provider_id}', 'model.{id,memberType,consortium.id}')
  get canRead() {
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
}
