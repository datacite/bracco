import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    return this.store.createRecord('provider', {
      billingInformation: {},
      technicalContact: this.store.createFragment('contact'),
      secondaryTechnicalContact: this.store.createFragment('contact'),
      billingContact: this.store.createFragment('contact'),
      secondaryBillingContact: this.store.createFragment('contact'),
      serviceContact: this.store.createFragment('contact'),
      secondaryServiceContact: this.store.createFragment('contact'),
      votingContact: this.store.createFragment('contact'),
      isActive: true,
    });
  },

  afterModel(model) {
    if (this.get('can').cannot('create provider', model)) {
      return this.transitionTo('index');
    }
  },
});
