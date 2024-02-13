import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  currentUser: service(),
  flashMessages: service(),
  prefixes: service(),
  router: service(),

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
          self.router.transitionTo('index');
        });
    }
  },

  afterModel() {
    if (this.can.cannot('read index') && this.currentUser) {
      this.router.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});