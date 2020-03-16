import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('provider', {
  default: {
    memberType: 'direct_member',
    technicalContact: { },
    secondaryTechnicalContact: { },
    billingContact: {
      email: 'services@ardc.edu.au',
      givenName: 'Adrian',
      familyName: 'Burton',
    },
    secondaryBillingContact: {
      email: 'finance@ardc.edu.au',
      givenName: 'David',
      familyName: 'Vitkin',
    },
    serviceContact: {
      email: 'services@ardc.edu.au',
      givenName: 'ARDC Services',
    },
    secondaryServiceContact: { },
    votingContact: { },
  },

});
