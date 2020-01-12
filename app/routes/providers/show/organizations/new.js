import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),

  model() {
    let provider = this.modelFor('providers/show');
    let organization = this.store.createRecord('provider', {
      consortium: provider,
      memberType: 'consortium_organization',
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

    return hash({
      provider,
      organization,
    });
  },

  // afterModel(model) {
  //   if (this.get('can').cannot('create doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});