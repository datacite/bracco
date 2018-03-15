import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
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
  ],
  suffix: [
    validator('presence', {
      presence: true,
      message: 'The DOI suffix can\'t be blank.'
    }),
    validator('format', {
      regex: /^[-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.'
    }),
    validator('unique-doi', {
      dependentKeys: ['model.prefix'],
      disabled: Ember.computed('model', function() {
        return !this.get('model').get('isNew');
      })
    })
  ],
  url: [
    validator('format', {
      type: 'url',
      allowBlank: true,
      message: 'Please enter a valid URL that the DOI should resolve to.'
    }),
    validator('presence', {
      presence: true,
      message: 'Please enter a valid URL that the DOI should resolve to.',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      })
    }),
    validator('valid-url', {
      allowBlank: true,
      isWarning: Ember.computed('model', function() {
        return this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      }),
    })
  ],
  title: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('xml') || this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      })
    })
  ],
  publisher: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('xml') || this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      })
    })
  ],
  published: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model', function() {
        return this.get('model').get('xml') || this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      })
    })
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: Ember.computed('model', function() {
        return this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
      })
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      isWarning: Ember.computed('model', function() {
        return this.get('model').get('state') === 'draft' || this.get('model').get('doi').startsWith('10.5072');
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
  prefix: DS.attr('string'),
  suffix: DS.attr('string'),
  url: DS.attr('string'),
  media: DS.attr(),
  creator: DS.attr(),
  title: DS.attr('wrapped'),
  publisher: DS.attr('string'),
  published: DS.attr('string'),
  description: DS.attr('wrapped'),
  license: DS.attr('string'),
  xml: DS.attr('xml'),
  resourceTypeSubtype: DS.attr('string'),
  version: DS.attr('string'),
  metadataVersion: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: true }),
  state: DS.attr('string'),
  event: DS.attr('string'),
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
  })
});
