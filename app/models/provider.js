import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';
import { fragment } from 'ember-data-model-fragments/attributes';
import { A } from '@ember/array';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', {
      presence: true,
      disabled: computed('model', function() {
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
      disabled: computed('model', function() {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Member ID does not match',
      disabled: computed('model', function() {
        return this.model.get('isNew');
      })
    })
  ],
  twitterHandle: [
    validator('format', {
      regex: /^@[a-zA-Z0-9_]{0,15}$/,
      allowBlank: true,
      message: 'Must start with @ followed by up to 15 alphanumeric characters.'
    }),
  ],
  name: validator('presence', true),
  displayName: validator('presence', true),
  systemEmail: [
    validator('presence', true),
    validator('format', {
      type: 'email',
      allowNonTld: true,
      message: 'Please enter a valid email address.'
    })
  ],
  groupEmail: [
    validator('format', {
      type: 'email',
      allowNonTld: true,
      allowBlank: true,
      message: 'Please enter a valid email address.'
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      })
    })
  ],
  website: [
    validator('format', {
      type: 'url',
      allowBlank: true,
      message: 'Please enter a valid website URL.'
    })
  ],
  rorId: [
    validator('format', {
      type: 'url',
      allowBlank: true,
      message: 'Please enter a valid ROR ID expressed as URL.'
    })
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.'
    }),
  ]
});

export default Model.extend(Validations, {
  consortium: belongsTo('provider', {
    inverse: 'consortiumOrganizations', async: true
  }),
  consortiumOrganizations: hasMany('provider', {
    inverse: 'consortium', async: true
  }),
  meta: attr(),

  name: attr('string'),
  displayName: attr('string'),
  symbol: attr('string'),
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

  uid: computed('id', function() {
    return this.id.toUpperCase();
  }),
  doiCount: computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  currentDoiCount: computed('doiCount', function() {
    let currentYear = A(this.doiCount).findBy('id', 2019);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  resourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  repositoryCount: computed('meta.clients', function() {
    return this.get('meta.clients');
  }),
  currentRepositoryCount: computed('repositoryCount', function() {
    let currentYear = A(this.repositoryCount).findBy('id', 2019);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  providerCount: computed('meta', function() {
    return this.get('meta.providers');
  }),
  isEnvironmentProduction: computed('repository', function() {
    if (ENV.environment === "production"){
      return true;
    }
    return false;
  }),
  currentProviderCount: computed('providerCount', function() {
    let currentYear = this.providerCount.get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});
