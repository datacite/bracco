import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  providers: DS.hasMany('provider'),
  clients: DS.hasMany('client'),

  created: DS.attr('date')
});
