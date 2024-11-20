import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SettingsRoute extends Route {
  @service
  can;

  @service
  currentUser;

  @service
  prefixes;

  @service
  router;

  @service
  store;

  @service
  flashMessages;

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
