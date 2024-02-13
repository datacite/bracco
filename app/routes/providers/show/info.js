import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),
  router: service(),

  model() {
    return this.modelFor('providers/show');
  },

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  },
});
