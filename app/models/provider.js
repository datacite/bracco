import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
// import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';
// import { fragment } from 'ember-data-model-fragments/attributes';
import addressFormatter from '@fragaria/address-formatter';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', {
      presence: true,
      disabled: computed('model', function () {
        return !this.model.get('isNew');
      })
    }),
    validator('format', {
      regex: /^[A-Z]+$/,
      message: 'The Member ID can contain only upper case letters'
    }),
    validator('length', {
      min: 2,
      max: 8
    })
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Member ID does not match',
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ],
  globusUuid: [
    validator('uuid-format', {
      version: 4,
      allowBlank: true,
      message: 'Must be a valid UUID (version 4).'
    })
  ],
  twitterHandle: [
    validator('format', {
      regex: /^@[a-zA-Z0-9_]{0,15}$/,
      allowBlank: true,
      message: 'Must start with @ followed by up to 15 alphanumeric characters.'
    })
  ],
  name: validator('presence', true),
  displayName: validator('presence', true),
  systemEmail: [validator('presence', true), validator('email-format', true)],
  groupEmail: [
    validator('email-format', {
      allowBlank: true
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', function () {
        return this.model.get('keepPassword');
      })
    })
  ],
  website: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid website URL.'
    })
  ],
  rorId: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid ROR ID expressed as URL.'
    })
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.'
    })
  ],
  votingContact: [
    validator('presence', {
      presence: true,
      message:
        'Please first add a contact for the voting role via the contacts menu.',
      disabled: computed('model', function () {
        return (
          this.model.get('isNew') ||
          this.model.get('memberType') === 'consortium_organization'
        );
      })
    })
  ],
  serviceContact: [
    validator('presence', {
      presence: true,
      message:
        'Please first add a contact for the service role via the contacts menu.',
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ],
  billingContact: [
    validator('presence', {
      presence: true,
      message:
        'Please first add a contact for the billing role via the contacts menu.',
      disabled: computed('model', function () {
        return (
          this.model.get('isNew') ||
          this.model.get('memberType') === 'consortium_organization'
        );
      })
    })
  ]
});

export default Model.extend(Validations, {
  consortium: belongsTo('provider', {
    inverse: 'consortiumOrganizations',
    async: true
  }),
  consortiumOrganizations: hasMany('provider', {
    inverse: 'consortium',
    async: true
  }),
  contacts: hasMany('contact', {
    inverse: 'provider',
    async: true
  }),

  meta: attr(),

  name: attr('string'),
  displayName: attr('string'),
  symbol: attr('string'),
  globusUuid: attr('string'),
  description: attr('string'),
  region: attr('string'),
  country: attr('country'),
  memberType: attr('string'),
  organizationType: attr('string'),
  focusArea: attr('string'),
  logoUrl: attr('string'),
  systemEmail: attr('string'),
  groupEmail: attr('string'),
  website: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  passwordInput: attr('string'),
  nonProfitStatus: attr('string'),
  hasPassword: attr('boolean'),
  keepPassword: attr('boolean', { defaultValue: true }),
  rorId: attr('string'),
  salesforceId: attr('string'),
  twitterHandle: attr('string'),
  logo: attr(),
  billingInformation: attr('billingInformation'),
  joined: attr('date'),
  created: attr('date'),
  updated: attr('date'),

  uid: computed('id', function () {
    return this.id.toUpperCase();
  }),
  filteredContacts: reads('contacts'),
  votingContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) => contact.roleName && contact.roleName.includes('voting')
    );
  }),
  serviceContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) => contact.roleName && contact.roleName.includes('service')
    );
  }),
  secondaryServiceContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) =>
        contact.roleName && contact.roleName.includes('secondary_service')
    );
  }),
  technicalContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) => contact.roleName && contact.roleName.includes('technical')
    );
  }),
  secondaryTechnicalContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) =>
        contact.roleName && contact.roleName.includes('secondary_technical')
    );
  }),
  billingContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) => contact.roleName && contact.roleName.includes('billing')
    );
  }),
  secondaryBillingContact: computed('contacts', function () {
    return this.contacts.find(
      (contact) =>
        contact.roleName && contact.roleName.includes('secondary_billing')
    );
  }),
  formattedBillingInformation: computed(
    'billingInformation',
    'billingInformation.{address,city,postCode,state.name,country,country.name,country.code}',
    function () {
      if (this.billingInformation) {
        return addressFormatter.format(
          {
            road: this.billingInformation.address,
            city: this.billingInformation.city,
            postcode: this.billingInformation.postCode
              ? this.billingInformation.postCode
              : null,
            state: this.billingInformation.state
              ? this.billingInformation.state.name
              : null,
            country: this.billingInformation.country
              ? this.billingInformation.country.name
              : null,
            countryCode: this.billingInformation.country
              ? this.billingInformation.country.code
              : null
          },
          {
            output: 'array'
          }
        );
      } else {
        return null;
      }
    }
  )
});
