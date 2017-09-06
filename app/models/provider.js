import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  clients: DS.hasMany('client'),
  users: DS.hasMany('user'),

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
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  })
});
