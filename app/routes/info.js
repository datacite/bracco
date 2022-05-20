import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),
  prefixes: service(),

  model() {
    if (this.can.can('read index')) {
      let self = this;
      return this.store
        .findRecord('provider', 'admin')
        .then(function (admin) {
          return admin;
        })
        .catch(function (reason) {
          console.debug(reason);

          self.get('flashMessages').warning(reason);
          self.transitionTo('index');
        });
    }
  },

  afterModel() {
    if (this.can.cannot('read index') && this.currentUser) {
      this.transitionTo('index');
    } else if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger("There are 0 prefixes available. Request new prefixes to CNRI.");
        }
      }, function(reason) {
        console.debug(reason);
      });
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
