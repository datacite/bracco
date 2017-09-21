import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [
    validator('presence', true),
    validator('unique-provider-id', true),
    validator('format', {
      regex: /^[a-z]+$/,
      message: 'The Provider ID can contain only lower case letters'
    }),
    validator('length', {
      min: 2,
      max: 8
    })
  ],
  name: validator('presence', true),
  contact: validator('presence', true),
  email: [
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

  name: DS.attr('string'),
  description: DS.attr('string'),
  region: DS.attr('string'),
  country: DS.attr('string'),
  year: DS.attr('number'),
  logoUrl: DS.attr('string'),
  contact: DS.attr('string'),
  email: DS.attr('string'),
  website: DS.attr('string'),
  phone: DS.attr('string'),
  isActive: DS.attr('boolean'),
  doiCount: DS.attr(),
  clientCount: DS.attr(),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: Ember.computed('id', function() {
    return this.get('id').toUpperCase();
  }),
  currentDoiCount: Ember.computed('doiCount', function() {
    let currentYear = this.get('doiCount').findBy('id', 2017);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }),
  currentClientCount: Ember.computed('clientCount', function() {
    let currentYear = this.get('clientCount').findBy('id', 2017);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});
