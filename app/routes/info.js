import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class InfoRoute extends Route {
  @service
  can;

  @service
  currentUser;

  @service
  flashMessages;

  @service
  prefixes;

  @service
  router;

  @service
  store;

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
  }

  afterModel() {
    if (this.can.cannot('read index') && this.currentUser) {
      this.router.transitionTo('index');
    }
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
