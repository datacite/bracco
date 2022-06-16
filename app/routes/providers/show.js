import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),
  currentUser: service(),
  prefixes: service(),

  model(params) {
    let self = this;
    return this.store
      .findRecord('provider', params.provider_id, {
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
        self.transitionTo('/');
      });
  },

  afterModel() {
    if (this.get('currentUser.role_id') === 'staff_admin') {
      let self = this;
      this.prefixes.available().then(function(value) {
        if (value <= 0) {
          self.get('flashMessages').danger(self.prefixes.msg_zero);
        } else if (value < self.prefixes.min) {
          self.get('flashMessages').warning(self.prefixes.msg_min);
        }
      }, function(reason) {
        console.debug(reason);
      });
    }
  },

  redirect(model) {
    if (this.can.cannot('read provider', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
