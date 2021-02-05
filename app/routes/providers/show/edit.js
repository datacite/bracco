import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
    let provider = this.modelFor('providers/show');
    provider.set('confirmSymbol', provider.get('symbol'));
    return provider;
  },

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.transitionTo('index');
    }
  }
});
