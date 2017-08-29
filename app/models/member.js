import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  "data-centers": DS.hasMany('data-center'),
  users: DS.hasMany('user'),

  name: DS.attr('string'),
  description: DS.attr('string'),
  memberType: DS.attr('string'),
  region: DS.attr('string'),
  country: DS.attr('string'),
  year: DS.attr('number'),
  logoUrl: DS.attr('string'),
  email: DS.attr('string'),
  website: DS.attr('string'),
  phone: DS.attr('string'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  name: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  })
});
