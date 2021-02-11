import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    this.getContacts();
  },

  getContacts() {
    this.model.set(
      'votingContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('voting'))
    );
    this.model.set(
      'serviceContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('service'))
    );
    this.model.set(
      'secondaryServiceContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('secondary_service'))
    );
    this.model.set(
      'technicalContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('technical'))
    );
    this.model.set(
      'secondaryTechnicalContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('secondary_technical'))
    );
    this.model.set(
      'billingContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('billing'))
    );
    this.model.set(
      'secondaryBillingContact',
      this.model
        .get('contacts')
        .find((contact) => contact.roleName.includes('secondary_billing'))
    );
  }
});
