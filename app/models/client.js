import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider'),
  users: DS.hasMany('user'),

  name: DS.attr('string'),
  year: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  uid: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  })
});
