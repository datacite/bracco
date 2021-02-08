import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    this.getContacts();
    this.votingContacts = this.searchVotingContact(null);
    this.serviceContacts = this.searchServiceContact(null);
    this.secondaryServiceContacts = this.searchSecondaryServiceContact(null);
    this.technicalContacts = this.searchTechnicalContact(null);
    this.secondaryTechnicalContacts = this.searchSecondaryTechnicalContact(
      null
    );
    this.billingContacts = this.searchBillingContact(null);
    this.secondaryBillingContacts = this.searchSecondaryBillingContact(null);
  },

  getContacts() {
    let self = this;
    return this.store
      .query('contact', {
        'provider-id': this.get('model.id'),
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

  searchVotingContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('votingContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('votingContacts', []);
      });
  },

  searchServiceContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('serviceContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('serviceContacts', []);
      });
  },
  searchSecondaryServiceContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('secondaryServiceContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('secondaryServiceContacts', []);
      });
  },
  searchTechnicalContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('technicalContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('technicalContacts', []);
      });
  },
  searchSecondaryTechnicalContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('secondaryTechnicalContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('secondaryTechnicalContacts', []);
      });
  },
  searchBillingContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('billingContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('billingContacts', []);
      });
  },
  searchSecondaryBillingContact(query) {
    let self = this;
    this.store
      .query('contact', {
        query,
        'provider-id': this.get('model.id'),
        'page[size]': 25
      })
      .then(function (contacts) {
        self.model.set('secondaryBillingContacts', contacts);
      })
      .catch(function (reason) {
        console.debug(reason);
        self.model.set('secondaryBillingContacts', []);
      });
  },

  actions: {
    searchVotingContact(query) {
      this.searchVotingContact(query);
    },
    searchServiceContact(query) {
      this.searchServiceContact(query);
    },
    searchSecondaryServiceContact(query) {
      this.searchSecondaryServiceContact(query);
    },
    searchTechnicalContact(query) {
      this.searchTechnicalContact(query);
    },
    searchSecondaryTechnicalContact(query) {
      this.searchSecondaryTechnicalContact(query);
    },
    searchBillingContact(query) {
      this.searchBillingContact(query);
    },
    searchSecondaryBillingContact(query) {
      this.searchSecondaryBillingContact(query);
    },
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
