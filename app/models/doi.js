import { computed } from '@ember/object';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from 'bracco/config/environment';
import Model from 'ember-data/model';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: computed('model.mode', 'model.state', 'model.prefix', function () {
        return !["new", "edit"].includes(this.model.get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  confirmDoi: [
    validator('presence', {
      presence: true,
      disabled: computed('model.mode', function () {
        return this.model.get('mode') !== 'delete';
      })
    }),
    validator('confirmation', {
      on: 'doi',
      message: 'DOI does not match',
      disabled: computed('model.mode', function () {
        return this.model.get('mode') !== 'delete';
      })
    })
  ],
  suffix: [
    validator('presence', {
      presence: true,
      message: 'The DOI suffix can\'t be blank.',
      disabled: computed('model.mode', function () {
        return !["new", "upload"].includes(this.model.get('mode'));
      })
    }),
    validator('format', {
      regex: /^[A-Za-z0-9][-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.',
      disabled: computed('model.mode', function () {
        return !["new", "upload"].includes(this.model.get('mode'));
      })
    }),
    validator('unique-doi', {
      dependentKeys: ['model.prefix'],
      disabled: computed('model.mode', function () {
        return !["new", "upload"].includes(this.model.get('mode'));
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
      isWarning: computed('model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
  ],
  'creators': [
    validator('has-many')
  ],
  publisher: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: computed('model.mode', function () {
        return !["new", "edit"].includes(this.model.get('mode'));
      })
    })
  ],
  publicationYear: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: computed('model.mode', function () {
        return !["new", "edit"].includes(this.model.get('mode'));
      })
    }),
    validator('date', {
      allowBlank: true,
      after: '1449',
      before: '2021',
      precision: 'year',
      format: 'YYYY',
      errorFormat: 'YYYY',
      message: "Must be between 1450 and 2020.",
      disabled: computed('model.mode', function () {
        return !["new", "edit"].includes(this.model.get('mode'));
      })
    })
  ],
  'types.resourceTypeGeneral': [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: computed('model.mode', function () {
        return !["new", "edit"].includes(this.model.get('mode'));
      })
    })
  ],
  'titles': [
    validator('has-many')
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: computed('model.mode', 'model.state', 'model.prefix', function () {
        return !["upload", "modify"].includes(this.model.get('mode')) || (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      isWarning: computed('model.mode', 'model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      }),
      disabled: computed('model.mode', function () {
        return !["upload", "modify"].includes(this.model.get('mode'));
      })
    })
  ],
  'descriptions': [
    validator('has-many')
  ]
});

export default Model.extend(Validations, {
  client: DS.belongsTo('client', {
    async: true
  }),

  doi: DS.attr('string'),
  identifiers: DS.attr(),
  confirmDoi: DS.attr('string', { defaultValue: null }),
  prefix: DS.attr('string'),
  suffix: DS.attr('string'),
  url: DS.attr('string'),
  contentUrl: DS.attr(),
  creators: fragmentArray('creator'),
  titles: fragmentArray('title'),
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
  descriptions: fragmentArray('description', { defaultValue: [] }),
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

  identifier: computed('doi', function () {
    if (ENV.API_URL == "https://api.datacite.org" || this.client.get("id") === 'crossref.citations') {
      return "https://doi.org/" + this.doi;
    } else {
      return "https://handle.test.datacite.org/" + this.doi;
    }
  }),
  isDraft: computed('state', function () {
    return this.state === 'draft';
  }),
  schemaVersionString: computed('schemaVersion', function () {
    if (this.schemaVersion) {
      return this.schemaVersion.split("-").get("lastObject");
    } else {
      return null;
    }
  })
});
