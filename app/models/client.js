import { computed } from '@ember/object';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('client-id', true),
    validator('unique-client-id', {
      presence: true,
      disabled: computed('model', function() {
        return !this.model.get('isNew');
      })
    }),
    validator('format', {
      regex: /^[A-Z]+\.[A-Z0-9]+(-[A-Z0-9]+)?$/,
      message: 'The Client ID must start with the Provider ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen.'
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
      message: 'Client ID does not match',
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
  domains: validator('presence', true),
  contactName: validator('presence', true),
  contactEmail: [
    validator('presence', true),
    validator('format', {
      type: 'email',
      allowNonTld: true
    })
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: true
  }),
  repository: DS.belongsTo('repository', {
    async: true
  }),
  meta: DS.attr(),

  name: DS.attr('string'),
  symbol: DS.attr('string'),
  domains: DS.attr('string', { defaultValue: '*' }),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  year: DS.attr('number'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  clientType: DS.attr('string'),
  software: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  passwordInput: DS.attr('string'),
  hasPassword: DS.attr('boolean'),
  keepPassword: DS.attr('boolean', { defaultValue: true }),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  targetId: DS.attr(),

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
  badgeUrl: computed('re3data', function() {
    if (this.re3data) {
      return ENV.RE3DATA_API_URL + '/re3data/' + this.re3data.substr(this.re3data.indexOf('1')) + '/badge';
    } else {
      return null;
    }
  })
});
