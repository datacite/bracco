import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [
    validator('presence', true),
    validator('format', {
      regex: /^[a-z0-9\.]+$/,
      message: 'The Client ID can contain only upper case letters and numbers, and must start with the Provider ID'
    }),
    validator('length', {
      min: 5,
      max: 17
    })
  ],
  name: validator('presence', true),
  domains: validator('presence', true),
  contact: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider'),
  prefixes: DS.hasMany('prefix'),
  users: DS.hasMany('user'),

  name: DS.attr('string'),
  domains: DS.attr('string'),
  contact: DS.attr('string'),
  email: DS.attr('string'),
  year: DS.attr('number'),
  isActive: DS.attr('boolean'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  domainList: Ember.computed('domains', function() {
    return this.get('domains').split(",").map(function(item) {
      return item.trim();
    });
  }),
  uid: Ember.computed('id', function() {
    return this.get('id').toUpperCase();
  })
});
