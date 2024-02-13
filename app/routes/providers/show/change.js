import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),
  router: service(),

  model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));
    provider.set('disableValidations', true);
    return provider;
  },

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  },
});
