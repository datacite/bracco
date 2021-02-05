import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('serviceContact')) {
      this.getContacts();
    }
  },

  getContacts() {
    let self = this;
    return this.store
      .query('contact', {
        'provider-id': this.model.id,
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set(
          'votingContact',
          contacts.find((contact) => contact.roleName.includes('voting'))
        );
        self.model.set(
          'serviceContact',
          contacts.find((contact) => contact.roleName.includes('service'))
        );
        self.model.set(
          'secondaryServiceContact',
          contacts.find((contact) =>
            contact.roleName.includes('secondary_service')
          )
        );
        self.model.set(
          'technicalContact',
          contacts.find((contact) => contact.roleName.includes('technical'))
        );
        self.model.set(
          'secondaryTechnicalContact',
          contacts.find((contact) =>
            contact.roleName.includes('secondary_technical')
          )
        );
        self.model.set(
          'billingContact',
          contacts.find((contact) => contact.roleName.includes('billing'))
        );
        self.model.set(
          'secondaryBillingContact',
          contacts.find((contact) =>
            contact.roleName.includes('secondary_billing')
          )
        );
      });
  },
  actions: {}
});
