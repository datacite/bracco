import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["new", "edit"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  confirmDoi: [
    validator('presence', {
      presence: true,
      disabled: Ember.computed('model.mode', function() {
        return this.get('model').get('mode') !== 'delete';
      })
    }),
    validator('confirmation', {
      on: 'doi',
      message: 'DOI does not match',
      disabled: Ember.computed('model.mode', function() {
        return this.get('model').get('mode') !== 'delete';
      })
    })
  ],
  suffix: [
    validator('presence', {
      presence: true,
      message: 'The DOI suffix can\'t be blank.',
      disabled: Ember.computed('model.mode', function() {
        return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    }),
    validator('format', {
      regex: /^[A-Za-z0-9][-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.',
      disabled: Ember.computed('model.mode', function() {
        return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    }),
    validator('unique-doi', {
      dependentKeys: ['model.prefix'],
      disabled: Ember.computed('model.mode', function() {
        return !["new", "upload"].includes(this.get('model').get('mode'));
      })
    })
  ],
  url: [
    validator('format', {
      regex: /(http|https|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
      allowBlank: true,
      message: 'Please enter a valid URL that the DOI should resolve to.'
    }),
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
    // validator('valid-url', {
    //   allowBlank: true,
    //   isWarning: true
    // })
  ],
  creators: [
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    })
  ],
  titles: [
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    })
  ],
  publisher: [
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    })
  ],
  publicationYear: [
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    }),
    validator('date', {
      allowBlank: true,
      after: '1449',
      before: '2020',
      precision: 'year',
      format: 'YYYY',
      errorFormat: 'YYYY',
      message: "Must be between 1450 and 2019.",
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    })
  ],
  types: [
    validator('presence', {
      presence: true,
      isWarning: Ember.computed('model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["new", "edit"].includes(this.get('model').get('mode'));
      })
    })
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return !["upload", "modify"].includes(this.get('model').get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      isWarning: Ember.computed('model.mode', 'model.state', 'model.prefix', function() {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: Ember.computed('model.mode', function() {
        return !["upload", "modify"].includes(this.get('model').get('mode'))
      })
    })
  ]
});

export default DS.Model.extend(Validations, {
  client: DS.belongsTo('client', {
    async: true
  }),

  doi: DS.attr('string'),
  identifiers: DS.attr(),
  confirmDoi: DS.attr('string', { defaultValue: null }),
  prefix: DS.attr('string'),
  suffix: DS.attr('string'),
  url: DS.attr('string'),
  contentUrl: DS.attr('string'),
  creators: DS.attr('creators', { defaultValue: null }),
  titles: DS.attr(),
  publisher: DS.attr('string'),
  bcontainer: DS.attr(),
  publicationYear: DS.attr('number'),
  subjects: DS.attr(),
  contributors: DS.attr(),
  dates: DS.attr(),
  language: DS.attr(),
  types: DS.attr(),
  relatedIdentifiers: DS.attr(),
  sizes: DS.attr(),
  formats: DS.attr(),
  version: DS.attr('string'),
  rightsList: DS.attr(),
  descriptions: DS.attr(),
  geoLocations: DS.attr(),
  fundingReferences: DS.attr(),
  landingPage: DS.attr(),
  xml: DS.attr('xml'),
  metadataVersion: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  source: DS.attr('string', { defaultValue: "fabrica" }),
  state: DS.attr('string'),
  breason: DS.attr('string', { defaultValue: null }),
  isActive: DS.attr('boolean', { defaultValue: true }),
  event: DS.attr('string'),
  created: DS.attr('date'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),
  mode: DS.attr('string'),

  identifier: Ember.computed('identifiers', function() {
    if (this.get('identifiers')) {
      let id =  this.get('identifiers').findBy('identifierType', 'DOI');
      if (id) {
        return id.identifier;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }),
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
