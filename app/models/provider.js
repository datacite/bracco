import DS from 'ember-data';
import { computed } from '@ember/object';
// import ENV from 'bracco/config/environment';
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
      }),
    }),
    validator('format', {
      regex: /^[A-Z]+$/,
      message: 'The Member ID can contain only upper case letters',
    }),
    validator('length', {
      min: 2,
      max: 8,
    }),
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('isNew');
      }),
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Member ID does not match',
      disabled: computed('model', function() {
        return this.model.get('isNew');
      }),
    }),
  ],
  globusUuid: [
    validator('uuid-format', {
      version: 4,
      allowBlank: true,
      message: 'Must be a valid UUID (version 4).',
    }),
  ],
  twitterHandle: [
    validator('format', {
      regex: /^@[a-zA-Z0-9_]{0,15}$/,
      allowBlank: true,
      message: 'Must start with @ followed by up to 15 alphanumeric characters.',
    }),
  ],
  name: validator('presence', true),
  displayName: validator('presence', true),
  systemEmail: [
    validator('presence', true),
    validator('email-format', true),
  ],
  groupEmail: [
    validator('email-format', {
      allowBlank: true,
    }),
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      }),
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      }),
    }),
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      }),
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', function() {
        return this.model.get('keepPassword');
      }),
    }),
  ],
  website: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid website URL.',
    }),
  ],
  rorId: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid ROR ID expressed as URL.',
    }),
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.',
    }),
  ],
});

export default DS.Model.extend(Validations, {
  consortium: DS.belongsTo('provider', {
    inverse: 'consortiumOrganizations', async: true,
  }),
  consortiumOrganizations: DS.hasMany('provider', {
    inverse: 'consortium', async: true,
  }),
  meta: DS.attr(),

  name: DS.attr('string'),
  displayName: DS.attr('string'),
  symbol: DS.attr('string'),
  globusUuid: DS.attr('string'),
  description: DS.attr('string'),
  region: DS.attr('string'),
  country: DS.attr('country'),
  memberType: DS.attr('string'),
  organizationType: DS.attr('string'),
  focusArea: DS.attr('string'),
  logoUrl: DS.attr('string'),
  systemEmail: DS.attr('string'),
  groupEmail: DS.attr('string'),
  website: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  passwordInput: DS.attr('string'),
  nonProfitStatus: DS.attr('string'),
  hasPassword: DS.attr('boolean'),
  keepPassword: DS.attr('boolean', { defaultValue: true }),
  rorId: DS.attr('string'),
  salesforceId: DS.attr('string'),
  twitterHandle: DS.attr('string'),
  billingInformation: DS.attr('billingInformation'),
  technicalContact: fragment('contact'),
  secondaryTechnicalContact: fragment('contact'),
  billingContact: fragment('contact'),
  secondaryBillingContact: fragment('contact'),
  secondaryServiceContact: fragment('contact'),
  serviceContact: fragment('contact'),
  votingContact: fragment('contact'),
  joined: DS.attr('date'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: computed('id', function() {
    return this.id.toUpperCase();
  }),
  doiCount: computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  currentDoiCount: computed('doiCount', function() {
    let currentYear = A(this.doiCount).findBy('id', new Date().getFullYear().toString());
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  resourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes').reduce(function(a, b) {
      return a + b.count;
    }, 0);
  }),
  repositoryCount: computed('meta.clients', function() {
    return this.get('meta.clients');
  }),
  currentRepositoryCount: computed('repositoryCount', function() {
    let currentYear = A(this.repositoryCount).findBy('id', new Date().getFullYear().toString());
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  providerCount: computed('meta.providers', function() {
    return this.get('meta.providers');
  }),
  currentProviderCount: computed('providerCount', function() {
    let currentYear = this.providerCount.get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
});
