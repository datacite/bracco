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
  description: DS.attr(),
  license: DS.attr('string'),
  xml: DS.attr('string'),
  resourceTypeGeneral: DS.attr('string'),
  resourceType: DS.attr('string'),
  version: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  relatedIdentifier: DS.attr(),
  state: DS.attr('string'),
  published: DS.attr('string'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),

  schemaVersionString: Ember.computed('schemaVersion', function() {
    if (this.get('schemaVersion')) {
      return this.get('schemaVersion').split("-").get("lastObject");
    } else {
      return null;
    }
  }),

  datacite: Ember.computed('xml', function() {
    let xml = atob(this.get('xml'));
    return (xml === '<hsh></hsh>') ? '' : xml;
  })
});
