import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from 'bracco/config/environment';
import DS from 'ember-data';
import { fragmentArray, array } from 'ember-data-model-fragments/attributes';
import { w } from '@ember/string';
import { A } from '@ember/array';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: computed('model.mode', 'model.state', function() {
        return ![ 'new', 'edit' ].includes(this.model.get('mode')) || this.model.get('state') === 'draft';
      }),
    }),
  ],
  confirmDoi: [
    validator('presence', {
      presence: true,
      disabled: computed('model.mode', function() {
        return this.model.get('mode') !== 'delete';
      }),
    }),
    validator('confirmation', {
      on: 'doi',
      message: 'DOI does not match',
      disabled: computed('model.mode', function() {
        return this.model.get('mode') !== 'delete';
      }),
    }),
  ],
  suffix: [
    validator('presence', {
      presence: true,
      message: 'The DOI suffix can\'t be blank.',
      disabled: computed('model.mode', function() {
        return ![ 'new', 'upload' ].includes(this.model.get('mode'));
      }),
    }),
    validator('format', {
      regex: /^[A-Za-z0-9][-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.',
      disabled: computed('model.mode', function() {
        return ![ 'new', 'upload' ].includes(this.model.get('mode'));
      }),
    }),
    validator('unique-doi', {
      dependentKeys: [ 'model.prefix' ],
      disabled: computed('model.mode', function() {
        return ![ 'new', 'upload' ].includes(this.model.get('mode'));
      }),
    }),
  ],
  url: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL that the DOI should resolve to.',
    }),
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
    }),
  ],
  publisher: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.mode', function() {
        return ![ 'new', 'edit' ].includes(this.model.get('mode'));
      }),
    }),
  ],
  publicationYear: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', 'model.prefix', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.mode', function() {
        return ![ 'new', 'edit' ].includes(this.model.get('mode'));
      }),
    }),
    validator('date', {
      allowBlank: true,
      after: '1449',
      before: '2021',
      precision: 'year',
      format: 'YYYY',
      errorFormat: 'YYYY',
      message: 'Must be a year between 1450 and 2021.',
      disabled: computed('model.mode', function() {
        return ![ 'new', 'edit' ].includes(this.model.get('mode'));
      }),
    }),
  ],
  'types.resourceTypeGeneral': [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.mode', function() {
        return ![ 'new', 'edit' ].includes(this.model.get('mode'));
      }),
    }),
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: computed('model.mode', 'model.state', function() {
        return ![ 'upload', 'modify' ].includes(this.model.get('mode')) || this.model.get('state') === 'draft';
      }),
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: [ 'model.doi' ],
      isWarning: computed('model.mode', 'model.state', 'model.prefix', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.mode', function() {
        return ![ 'upload', 'modify' ].includes(this.model.get('mode'));
      }),
    }),
  ],
});

export default DS.Model.extend(Validations, {
  repository: DS.belongsTo('repository', {
    async: true,
  }),

  doi: DS.attr('string'),
  confirmDoi: DS.attr('string', { defaultValue: null }),
  prefix: DS.attr('string'),
  suffix: DS.attr('string'),
  url: DS.attr('string'),
  contentUrl: DS.attr(),
  creators: fragmentArray('creator', { defaultValue: [] }),
  titles: fragmentArray('title', { defaultValue: [] }),
  publisher: DS.attr('string'),
  bcontainer: DS.attr(),
  publicationYear: DS.attr('number'),
  subjects: fragmentArray('subject', { defaultValue: [] }),
  contributors: fragmentArray('contributor', { defaultValue: [] }),
  identifiers: fragmentArray('identifier', { defaultValue: [] }),
  dates: fragmentArray('date', { defaultValue: [] }),
  language: DS.attr('string'),
  types: DS.attr(),
  relatedIdentifiers: fragmentArray('relatedIdentifier', { defaultValue: [] }),
  sizes: array(),
  formats: array(),
  version: DS.attr('string'),
  rightsList: fragmentArray('rights', { defaultValue: [] }),
  descriptions: fragmentArray('description', { defaultValue: [] }),
  geoLocations: fragmentArray('geoLocation', { defaultValue: [] }),
  fundingReferences: fragmentArray('fundingReference', { defaultValue: [] }),
  landingPage: DS.attr(),
  xml: DS.attr('xml'),
  metadataVersion: DS.attr('string'),
  schemaVersion: DS.attr('string'),
  source: DS.attr('string', { defaultValue: 'fabrica' }),
  state: DS.attr('string'),
  breason: DS.attr('string', { defaultValue: null }),
  isActive: DS.attr('boolean', { defaultValue: true }),
  event: DS.attr('string'),
  created: DS.attr('date'),
  registered: DS.attr('date'),
  updated: DS.attr('date'),
  mode: DS.attr('string'),
  meta: DS.attr(),
  citationCount: DS.attr('number'),
  viewCount: DS.attr('number'),
  downloadCount: DS.attr('number'),

  identifier: computed('doi', 'repository', function() {
    if (ENV.API_URL == 'https://api.datacite.org' || (w('crossref.citations medra.citations kisti.citations jalc.citations op.citations').includes(this.repository.get('id')))) {
      return 'https://doi.org/' + this.doi;
    } else {
      return 'https://handle.test.datacite.org/' + this.doi;
    }
  }),
  isDraft: computed('state', function() {
    return this.state === 'draft';
  }),
  showCitation: computed('registered', 'client', function() {
    return (this.registered || (w('crossref.citations medra.citations kisti.citations jalc.citations op.citations').includes(this.repository.get('id'))));
  }),
  schemaVersionString: computed('schemaVersion', function() {
    if (this.schemaVersion) {
      return A(this.schemaVersion.split('-')).get('lastObject');
    } else {
      return null;
    }
  }),
  title: computed('titles', function() {
    if (this.titles.length > 0) {
      return A(this.titles).get('firstObject').get('title');
    } else {
      return null;
    }
  }),
  description: computed('descriptions', function() {
    if (this.descriptions.length > 0) {
      return A(this.descriptions).get('firstObject').get('description');
    } else {
      return null;
    }
  }),
});
