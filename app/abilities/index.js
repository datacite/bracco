import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

@classic
export default class Index extends Ability {
  @service
  currentUser;

  @computed('currentUser.role_id')
  get canWrite() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }

  @computed('currentUser.role_id')
  get canRead() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      default:
        return false;
    }
  }
}
