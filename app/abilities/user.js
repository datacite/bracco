import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

@classic
export default class User extends Ability {
  @service
  currentUser;

  @computed('currentUser.{role_id,uid}', 'model.id')
  get canUpdate() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'consortium_admin':
      case 'provider_admin':
      case 'client_admin':
      case 'user':
        return this.get('currentUser.uid') === this.get('model.id');
      default:
        return false;
    }
  }

  @computed('currentUser.role_id')
  get canRead() {
    return true;
  }
}
