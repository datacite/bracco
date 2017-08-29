import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  member: DS.belongsTo('member'),
  users: DS.hasMany('user'),

  title: DS.attr('string'),
  year: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  name: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  })
});
