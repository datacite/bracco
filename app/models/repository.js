import Model, { belongsTo, attr } from '@ember-data/model';
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
      })
    }),
    validator('format', {
      regex: /^[A-Z]+\.[A-Z0-9]+(-[A-Z0-9]+)?$/,
      message: 'The Repository ID must start with the Member ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen.'
    }),
    validator('length', {
      min: 5,
      max: 18
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
      message: 'Repository ID does not match',
      disabled: computed('model', function() {
        return this.model.get('isNew');
      })
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
  name: validator('presence', true),
  systemEmail: [
    validator('presence', true),
    validator('format', {
      type: 'email',
      allowNonTld: true
    })
  ],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.'
    }),
  ],
  'issn.issnl': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN-L is in the wrong format.'
    })
  ],
  'issn.electronic': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN (electronic) is in the wrong format.'
    })
  ],
  'issn.print': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN (print) is in the wrong format.'
    })
  ]
});

export default Model.extend(Validations, {
  provider: belongsTo('provider', {
    async: true
  }),
  meta: attr(),

  name: attr('string'),
  alternateName: attr('string'),
  symbol: attr('string'),
  re3data: attr('string'),
  domains: attr('string', { defaultValue: '*' }),
  systemEmail: attr('string'),
  salesforceId: attr('string'),
  year: attr('number'),
  description: attr('string'),
  language: array(),
  certificate: array(),
  serviceContact: fragment('contact'),
  issn: fragment('issn'),
  url: attr('string'),
  clientType: attr('string'),
  repositoryType: array(),
  software: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  passwordInput: attr('string'),
  hasPassword: attr('boolean'),
  keepPassword: attr('boolean', { defaultValue: true }),
  created: attr('date'),
  updated: attr('date'),

  targetId: attr(),

  domainList: computed('domains', function() {
    return this.domains.split(",").map(function(item) {
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
    return this.get('meta.dois').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  resourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  badgeUrl: computed('re3data', function() {
    if (this.re3data) {
      return ENV.API_URL + '/re3data/' + this.re3data.substr(this.re3data.indexOf('1')) + '/badge';
    } else {
      return null;
    }
  })
});
