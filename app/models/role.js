import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.hasMany('user'),

  name: DS.attr('string'),
  updated: DS.attr('date')
});
