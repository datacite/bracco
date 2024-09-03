import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

@classic
export default class Message extends Ability {
  @service
  currentUser;

  @computed('currentUser.{role_id,provider_id,client_id}', 'model.id')
  get canRead() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return 'admin' === this.get('model.id');
      case 'consortium_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  }
}
