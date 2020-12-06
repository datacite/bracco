import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { w } from '@ember/string';

export default Route.extend({
  can: service(),
  currentUser: service(),

  model() {
    if (this.can.can('read index')) {
      let self = this;
      return this.store
        .findRecord('provider', 'admin')
        .then(function (model) {
          return model;
        })
        .catch(function (reason) {
          console.debug(reason);

          self.flashMessages.warning(
            'Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.'
          );
        });
    }
  },

  afterModel() {
    if (this.currentUser.role_id === 'staff_admin') {
      this.transitionTo('index');
    } else if (
      w('provider_admin consortium_admin client_admin user').includes(
        this.currentUser.role_id
      )
    ) {
      let home = this.currentUser.home;
      this.transitionTo(home.route, home.id);
    } else if (this.currentUser.role_id === 'temporary') {
      this.transitionTo('password');
    }
  }
});
