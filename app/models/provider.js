import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { not, reads } from '@ember/object/computed';
// import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';
import { fragment } from 'ember-data-model-fragments/attributes';
import addressFormatter from '@fragaria/address-formatter';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', {
      presence: true,
      disabled: not('model', function () {
        return this.model.isNew;
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
      disabled: reads('model', function () {
        return this.model.isNew;
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Member ID does not match',
      disabled: reads('model', function () {
        return this.model.isNew;
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
      disabled: reads('model', function () {
        return this.model.keepPassword;
      })
    }),
    validator('length', {
      min: 8,
      disabled: reads('model', function () {
        return this.model.keepPassword;
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: reads('model', function () {
        return this.model.keepPassword;
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: reads('model', function () {
        return this.model.keepPassword;
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
  technicalContact: fragment('contact'),
  secondaryTechnicalContact: fragment('contact'),
  billingContact: fragment('contact'),
  secondaryBillingContact: fragment('contact'),
  secondaryServiceContact: fragment('contact'),
  serviceContact: fragment('contact'),
  votingContact: fragment('contact'),
  joined: attr('date'),
  created: attr('date'),
  updated: attr('date'),

  uid: computed('id', function () {
    return this.id.toUpperCase();
  }),
  formattedBillingInformation: computed(
    'billingInformation.{address,city,postCode,country.code,country.name,state.name}',
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
