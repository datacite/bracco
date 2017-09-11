import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider', {
    async: true
  }),
  client: DS.belongsTo('client', {
    async: true
  }),

  identifier: DS.attr('string'),
  doi: DS.attr('string'),
  url: DS.attr('string'),
  media: DS.attr(),
  author: DS.attr(),
  title: DS.attr('string'),
  containerTitle: DS.attr('string'),
  description: DS.attr('string'),
  license: DS.attr('string'),
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
