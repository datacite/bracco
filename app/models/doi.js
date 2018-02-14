import Ember from 'ember';
import vkbeautify from 'npm:vkbeautify';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  doi: [
    validator('presence', true),
    // validator('format', {
    //   regex: /^[A-Z0-9.-]+$/,
    //   message: 'The DOI can contain only upper case letters and numbers'
    // })
  ],
  confirmDoi: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'doi',
      message: 'DOI does not match',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('isNew');
      })
    })
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: true
  }),
  client: DS.belongsTo('client', {
    async: true
  }),
  'resource-type': DS.belongsTo('resource-type', {
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
  resourceTypeSubtype: DS.attr('string'),
  version: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  relatedIdentifier: DS.attr(),
  state: DS.attr('string'),
  published: DS.attr('string'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),

  isDraft: Ember.computed('state', function() {
    return this.get('state') === 'draft';
  }),

  schemaVersionString: Ember.computed('schemaVersion', function() {
    if (this.get('schemaVersion')) {
      return this.get('schemaVersion').split("-").get("lastObject");
    } else {
      return null;
    }
  }),

  datacite: Ember.computed('xml', function() {
    let xml = atob(this.get('xml'));
    return (xml === '<hsh></hsh>') ? '' : vkbeautify.xml(xml);
  })
});
