import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  @service
  can;

  @service
  router;

  @service
  store;

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
  }

  afterModel(model) {
    if (this.can.cannot('create provider', model)) {
      return this.router.transitionTo('index');
    }
  }
}
