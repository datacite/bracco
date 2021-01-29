import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
    return this.modelFor('contacts/show');
  },

  afterModel(model) {
    if (this.can.cannot('read contact', model)) {
      this.transitionTo('index');
    }
  }
});
