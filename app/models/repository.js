import DS from 'ember-data';
import { computed } from '@ember/object';
import ENV from 'bracco/config/environment';
import { array, fragment } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('repository-id', true),
    validator('unique-repository-id', {
      presence: true,
      disabled: computed('model', function() {
        return !this.model.get('isNew');
      }),
    }),
    validator('format', {
      regex: /^[A-Z]+\.[A-Z0-9]+(-[A-Z0-9]+)?$/,
      message: 'The Repository ID must start with the Member ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen.',
    }),
    validator('length', {
      min: 5,
      max: 18,
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
      message: 'Repository ID does not match',
      disabled: computed('model', function() {
        return this.model.get('isNew');
      }),
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
  name: validator('presence', true),
  systemEmail: [
    validator('presence', true),
    validator('email-format', true),
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.',
    }),
  ],
  globusUuid: [
    validator('format', {
      regex: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      allowBlank: true,
      message: 'Must be a valid UUID (version 4).',
    }),
  ],
  'issn.issnl': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN-L is in the wrong format.',
    }),
  ],
  'issn.electronic': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN (electronic) is in the wrong format.',
    }),
  ],
  'issn.print': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN (print) is in the wrong format.',
    }),
  ],
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: true,
  }),
  meta: DS.attr(),

  name: DS.attr('string'),
  alternateName: DS.attr('string'),
  symbol: DS.attr('string'),
  globusUuid: DS.attr('string'),
  re3data: DS.attr('string'),
  domains: DS.attr('string', { defaultValue: '*' }),
  systemEmail: DS.attr('string'),
  salesforceId: DS.attr('string'),
  year: DS.attr('number'),
  description: DS.attr('string'),
  language: array(),
  certificate: array(),
  serviceContact: fragment('contact'),
  issn: fragment('issn'),
  url: DS.attr('string'),
  clientType: DS.attr('string'),
  repositoryType: array(),
  software: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  passwordInput: DS.attr('string'),
  hasPassword: DS.attr('boolean'),
  keepPassword: DS.attr('boolean', { defaultValue: true }),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  targetId: DS.attr(),

  domainList: computed('domains', function() {
    return this.domains.split(',').map(function(item) {
      return item.trim();
    });
  }),
  // 'provider-id': Ember.defineProperty('id', function() {
  //   return this.get('id').split('.').get('firstObject');
  // }),
  doiCount: computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  totalDoiCount: computed('meta.dois', function() {
    return this.get('meta.dois').reduce(function(a, b) {
      return a + b.count;
    }, 0);
  }),
  resourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes').reduce(function(a, b) {
      return a + b.count;
    }, 0);
  }),
  badgeUrl: computed('re3data', function() {
    if (this.re3data) {
      return ENV.API_URL + '/re3data/' + this.re3data.substr(this.re3data.indexOf('1')) + '/badge';
    } else {
      return null;
    }
  }),
});
