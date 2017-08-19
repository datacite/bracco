import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  member: DS.belongsTo('member'),
  'data-center': DS.belongsTo('data-center'),

  identifier: DS.attr('string'),
  doi: DS.attr('string'),
  author: DS.attr(),
  title: DS.attr('string'),
  containerTitle: DS.attr('string'),
  description: DS.attr('string'),
  xml: DS.attr('string'),
  resourceTypeId: DS.attr('string'),
  resourceTypeSubtype: DS.attr('string'),
  version: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  published: DS.attr('string'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),

  datacite: Ember.computed('xml', function() {
    return atob(this.get('xml'));
  })
});
