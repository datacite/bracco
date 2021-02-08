import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    this.getContacts();
  },

  getContacts() {
    if (this.model) {
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
  },

  actions: {
    selectVotingContact(contact) {
      if (contact) {
        this.model.set('votingContact', contact);
      }
    },
    selectServiceContact(contact) {
      if (contact) {
        console.log(contact);
        // contact.roleName.set(['service_contact']);
        this.model.set('serviceContact', contact);
      }
    },
    selectSecondaryServiceContact(contact) {
      if (contact) {
        this.model.set('secondaryServiceContact', contact);
      } else {
        this.model.set('secondaryServiceContact', null);
      }
    },
    selectTechnicalContact(contact) {
      if (contact) {
        this.model.set('technicalContact', contact);
      } else {
        this.model.set('technicalContact', null);
      }
    },
    selectSecondaryTechnicalContact(contact) {
      if (contact) {
        this.model.set('secondaryTechnicalContact', contact);
      } else {
        this.model.set('secondaryTechnicalContact', null);
      }
    },
    selectBillingContact(contact) {
      if (contact) {
        this.model.set('billingContact', contact);
      }
    },
    selectSecondaryBillingContact(contact) {
      if (contact) {
        this.model.set('secondaryBillingContact', contact);
      } else {
        this.model.set('secondaryBillingContact', null);
      }
    }
  }
});
