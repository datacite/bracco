import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),

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
