import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return this.store.createRecord('provider', {
      billingInformation: {},
      isActive: true
    });
  },

  afterModel(model) {
    if (this.get('can').cannot('create provider', model)) {
      return this.transitionTo('index');
    }
  }
});
