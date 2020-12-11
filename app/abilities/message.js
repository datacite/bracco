import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canRead: computed(
    'currentUser.{client_id,provider_id,role_id}',
    'model.id',
    function () {
      switch (this.currentUser.role_id) {
        case 'staff_admin':
          return 'admin' === this.model.id;
        case 'consortium_admin':
        case 'provider_admin':
          return this.currentUser.provider_id === this.model.id;
        case 'client_admin':
          return this.currentUser.client_id === this.model.id;
        default:
          return false;
      }
    }
  )
});
