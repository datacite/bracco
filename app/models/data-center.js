import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  updated: DS.attr('date'),

  name: Ember.computed('id', function() {
    return `${this.get('id').toUpperCase()}`;
  })
});
