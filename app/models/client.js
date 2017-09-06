import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider'),
  prefixes: DS.hasMany('prefix'),
  users: DS.hasMany('user'),

  name: DS.attr('string'),
  domains: DS.attr('string'),
  contact: DS.attr('string'),
  email: DS.attr('string'),
  year: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  }),
  domainList: Ember.computed('domains', function() {
    return this.get('domains').split(",").map(function(item) {
      return item.trim();
    });
  })
});
