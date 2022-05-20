import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { w } from '@ember/string';

export default Route.extend({
  can: service(),
  currentUser: service(),
  prefixes: service(),

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

          self.get('flashMessages').warning(reason);
        });
    }
  },

  afterModel() {
    if (this.get('currentUser.role_id') === 'staff_admin') {
      this.transitionTo('index');

      let self = this;
      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");
        } else if (value < 50) {
          self.get('flashMessages').warning("There are fewer than 50 prefixes available. Contact CNRI and request more prefixes.");
        }
      }, function(reason) {
        console.debug(reason);
      });
    } else if (
      w('provider_admin consortium_admin client_admin user').includes(
        this.get('currentUser.role_id')
      )
    ) {
      let home = this.currentUser.get('home');
      this.transitionTo(home.route, home.id);
    } else if (this.get('currentUser.role_id') === 'temporary') {
      this.transitionTo('password');
    }
  }
});
