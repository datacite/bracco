import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set, action } from '@ember/object';

export default class ShowRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  headData;

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

  model(params) {
    let self = this;
    return this.store
      .findRecord('provider', params.provider_id.toLowerCase(), {
        include: 'consortium,consortium-organizations,contacts'
      })
      .then(function (provider) {
        set(self, 'headData.title', provider.displayName);
        set(self, 'headData.description', provider.description);
        set(self, 'headData.image', provider.logoUrl);
        return provider;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  }

  afterModel() {
    if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(
        function (value) {
          // DEBUGGER
          /* Temporarily comment this out
          if (self.isDestroyed || self.isDestroying) {
            return;
          }
            */
          if (value <= 0) {
            self.get('flashMessages').danger(self.prefixes.msg_zero);
          } else if (value < self.prefixes.min) {
            self.get('flashMessages').warning(self.prefixes.msg_min);
          }
        },
        function (reason) {
          console.debug(reason);
        }
      );
    }
  }

  redirect(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  }

  @action
  queryParamsDidChange() {
    this.refresh();
  }
}
