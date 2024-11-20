import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ChangeRoute extends Route {
  @service
  can;

  @service
  features;

  @service
  router;

  @service
  store;

  model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));
    provider.set('disableValidations', true);
    return provider;
  }

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.router.transitionTo('index');
    }
  }
}
