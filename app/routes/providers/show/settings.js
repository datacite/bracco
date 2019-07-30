import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),
  
  model() {
    return this.store.findRecord('provider', this.modelFor('providers/show').get('id'));
  },

  afterModel(model) {
    if (this.get('can').cannot('read provider', model)) {
      this.transitionTo('index');
    }
  }
});
