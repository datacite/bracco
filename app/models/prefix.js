import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  members: DS.hasMany('member'),
  'data-centers': DS.hasMany('data-center'),

  created: DS.attr('date')
});
