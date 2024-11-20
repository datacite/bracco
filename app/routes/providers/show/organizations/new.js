import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default class NewRoute extends Route {
  @service
  can;

  @service
  store;

  model() {
    let provider = this.modelFor('providers/show');
    let organization = this.store.createRecord('provider', {
      consortium: provider,
      memberType: 'consortium_organization',
      billingInformation: {},
      votingContact: null,
      serviceContact: null,
      secondaryServiceContact: null,
      technicalContact: null,
      secondaryTechnicalContact: null,
      billingContact: null,
      secondaryBillingContact: null,
      isActive: true
      //doiEstimate: 0
    });

    return hash({
      provider,
      organization
    });
  }
}
