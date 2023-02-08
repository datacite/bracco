import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return this.store.createRecord('provider', {
      billingInformation: {},
      votingContact: null,
      serviceContact: null,
      secondaryServiceContact: null,
      technicalContact: null,
      secondaryTechnicalContact: null,
      billingContact: null,
      secondaryBillingContact: null,
      isActive: true
    });
  },

  afterModel(model) {
    if (this.can.cannot('create provider', model)) {
      return this.transitionTo('index');
    }
  }
});
