import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canRead: computed('currentUser.role_id', 'model.id', function() {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return 'admin' === this.get('model.id');
      case 'provider_admin':
        return this.get('currentUser.provider_id') === this.get('model.id');
      case 'client_admin':
        return this.get('currentUser.client_id') === this.get('model.id');
      default:
        return false;
    }
  }),
});
