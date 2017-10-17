import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-provider-id', true),
    validator('format', {
      regex: /^[A-Z]+$/,
      message: 'The Provider ID can contain only upper case letters'
    }),
    validator('length', {
      min: 2,
      max: 8
    })
  ],
  confirmSymbol: [
    validator('presence', {
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Provider ID does not match',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    })
  ],
  name: validator('presence', true),
  contactName: validator('presence', true),
  contactEmail: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default DS.Model.extend(Validations, {
  clients: DS.hasMany('client', {
    async: false
  }),
  prefixes: DS.hasMany('prefix', {
    async: false
  }),
  'provider-prefixes': DS.hasMany('provider-prefix', {
    async: false
  }),
  users: DS.hasMany('user', { async: false }),
  meta: DS.attr(),

  name: DS.attr('string'),
  symbol: DS.attr('string'),
  description: DS.attr('string'),
  region: DS.attr('string'),
  country: DS.attr('string'),
  year: DS.attr('number'),
  logoUrl: DS.attr('string'),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  website: DS.attr('string'),
  phone: DS.attr('string'),
  isActive: DS.attr('boolean'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: Ember.computed('id', function() {
    return this.get('id').toUpperCase();
  }),
  doiCount: Ember.computed('meta', function() {
    return this.get('meta.dois');
  }),
  currentDoiCount: Ember.computed('doiCount', function() {
    let currentYear = this.get('doiCount').findBy('id', 2017);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  clientCount: Ember.computed('meta', function() {
    return this.get('meta.clients');
  }),
  currentClientCount: Ember.computed('clientCount', function() {
    let currentYear = this.get('clientCount').get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  providerCount: Ember.computed('meta', function() {
    return this.get('meta.providers');
  }),
  currentProviderCount: Ember.computed('providerCount', function() {
    let currentYear = this.get('providerCount').get('lastObject');
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});
