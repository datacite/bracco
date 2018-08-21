import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('client-id', true),
    validator('unique-client-id', true),
    validator('format', {
      regex: /^[A-Z]+\.[A-Z0-9]+(-[A-Z0-9]+)?$/,
      message: 'The Client ID must start with the Provider ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen.'
    }),
    validator('length', {
      min: 5,
      max: 17
    })
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Client ID does not match',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('keepPassword');
      })
    }),
    validator('length', {
      min: 8,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('keepPassword');
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('keepPassword');
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('keepPassword');
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
    async: false
  }),
  repository: DS.belongsTo('repository', {
    async: false
  }),
  meta: DS.attr(),

  name: DS.attr('string'),
  symbol: DS.attr('string'),
  domains: DS.attr('string', { defaultValue: '*' }),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  year: DS.attr('number'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  passwordInput: DS.attr('string'),
  hasPassword: DS.attr('boolean'),
  keepPassword: DS.attr('boolean', { defaultValue: true }),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  targetId: DS.attr(),

  domainList: Ember.computed('domains', function() {
    return this.get('domains').split(",").map(function(item) {
      return item.trim();
    });
  }),
  // 'provider-id': Ember.computed('id', function() {
  //   return this.get('id').split('.').get('firstObject');
  // }),
  doiCount: Ember.computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  totalDoiCount: Ember.computed('meta.dois', function() {
    return this.get('meta.dois').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  badgeUrl: Ember.computed('repository', function() {
    if (this.get('repository')) {
      return ENV.API_URL + '/repositories/' + this.get('repository').get('id') + '/badge';
    } else {
      return null;
    }
  })
});
