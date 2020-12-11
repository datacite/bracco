import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canWrite: computed('currentUser.role_id', function () {
    switch (this.currentUser.role_id) {
      case 'staff_admin':
      case 'consortium_admin':
      case 'provider_admin':
        return true;
      default:
        return false;
    }
  }),
  canUpdate: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repositories,providers}',
    function () {
      // let self = this;
      switch (this.currentUser.role_id) {
        case 'staff_admin':
        case 'consortium_admin':
        case 'provider_admin':
          return true;
        // return this.model.providers.any(function(provider, index, providers) {
        //   return provider.id === self.currentUser.provider_id;
        // });
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repositories,providers}',
    function () {
      let self = this;
      switch (this.currentUser.role_id) {
        case 'staff_admin':
        case 'consortium_admin':
        case 'provider_admin':
          return true;
        // return this.model.providers.any(function(provider, index, providers) {
        //   return provider.id === self.currentUser.provider_id;
        // });
        case 'client_admin':
          return this.model.repositories.any(function (repository) {
            return repository.id === self.currentUser.client_id;
          });
        default:
          return false;
      }
    }
  )
});
