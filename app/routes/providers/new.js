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
    } else {
      this.flashMessages.warning('The contacts entered may receive notifications about training sessions, webinars, product testing, or news that will impact the use of DataCite services. Individuals may remove themselves from mailings by following the unsubscribe link provided in every DataCite email. For information about our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.', {
        sticky: true,
      });
    }
  },
});
