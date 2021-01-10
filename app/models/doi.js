import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from 'bracco/config/environment';
import Model, { attr, belongsTo } from '@ember-data/model';
import { fragmentArray, array } from 'ember-data-model-fragments/attributes';
import { w } from '@ember/string';
import { A } from '@ember/array';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: computed('model.mode', 'model.state', function () {
        return (
          !['new', 'edit'].includes(this.model.get('mode')) ||
          this.model.get('state') === 'draft'
        );
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
      message: "The DOI suffix can't be blank.",
      disabled: computed('model.mode', function () {
        return !['new', 'upload'].includes(this.model.get('mode'));
      })
    }),
    validator('format', {
      regex: /^[A-Za-z0-9][-._;()/:A-Za-z0-9]+$/,
      message: 'The DOI suffix contains invalid characters.',
      disabled: computed('model.mode', function () {
        return !['new', 'upload'].includes(this.model.get('mode'));
      })
    }),
    validator('unique-doi', {
      dependentKeys: ['model.prefix'],
      disabled: computed('model.mode', function () {
        return !['new', 'upload'].includes(this.model.get('mode'));
      })
    })
  ],
  url: [
    validator('url-format', {
      require_tld: false,
      message: 'Please enter a valid URL that the DOI should resolve to.',
      disabled: computed('model.state', function () {
        return this.model.get('state') === 'draft';
      })
    }),
    validator('url-domain', {
      disabled: computed('model.state', function () {
        return this.model.get('state') === 'draft';
      })
    })
  ],
  publisher: [
    validator('presence', {
      presence: true,
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    })
  ],
  publicationYear: [
    validator('presence', {
      presence: true,
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    }),
    validator('date', {
      after: '999',
      before: '2022',
      precision: 'year',
      format: 'YYYY',
      errorFormat: 'YYYY',
      message: 'Must be a year between 1000 and 2021.',
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    })
  ],
  'types.resourceTypeGeneral': [
    validator('presence', {
      presence: true,
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    }),
    validator('resource-type', {
      presence: true,
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    })
  ],
  xml: [
    validator('presence', {
      presence: true,
      message: 'Please include valid metadata.',
      disabled: computed('model.mode', 'model.state', function () {
        return (
          !['upload', 'modify'].includes(this.model.get('mode')) ||
          this.model.get('state') === 'draft'
        );
      })
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      disabled: computed('model.mode', 'model.state', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['upload', 'modify'].includes(this.model.get('mode'))
        );
      })
    })
  ]
});

export default Model.extend(Validations, {
  repository: belongsTo('repository', {
    async: true
  }),

  doi: attr('string'),
  confirmDoi: attr('string', { defaultValue: null }),
  prefix: attr('string'),
  suffix: attr('string'),
  url: attr('string'),
  contentUrl: attr(),
  creators: fragmentArray('creator', { defaultValue: [] }),
  titles: fragmentArray('title', { defaultValue: [] }),
  publisher: attr('string'),
  bcontainer: attr(),
  publicationYear: attr('number'),
  subjects: fragmentArray('subject', { defaultValue: [] }),
  contributors: fragmentArray('contributor', { defaultValue: [] }),
  alternateIdentifiers: fragmentArray('alternateIdentifier', {
    defaultValue: []
  }),
  dates: fragmentArray('date', { defaultValue: [] }),
  language: attr('string'),
  types: attr(),
  relatedIdentifiers: fragmentArray('relatedIdentifier', { defaultValue: [] }),
  sizes: array(),
  formats: array(),
  version: attr('string'),
  rightsList: fragmentArray('rights', { defaultValue: [] }),
  descriptions: fragmentArray('description', { defaultValue: [] }),
  geoLocations: fragmentArray('geoLocation', { defaultValue: [] }),
  fundingReferences: fragmentArray('fundingReference', { defaultValue: [] }),
  landingPage: attr(),
  xml: attr('xml'),
  metadataVersion: attr('string'),
  schemaVersion: attr('string'),
  source: attr('string', { defaultValue: 'fabrica' }),
  state: attr('string'),
  breason: attr('string', { defaultValue: null }),
  isActive: attr('boolean', { defaultValue: true }),
  event: attr('string'),
  created: attr('date'),
  registered: attr('date'),
  updated: attr('date'),
  mode: attr('string'),
  meta: attr(),
  citationCount: attr('number'),
  viewCount: attr('number'),
  downloadCount: attr('number'),

  identifier: computed('doi', 'repository', function () {
    if (
      ENV.API_URL == 'https://api.datacite.org' ||
      w(
        'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
      ).includes(this.repository.get('id'))
    ) {
      return 'https://doi.org/' + this.doi;
    } else {
      return 'https://handle.stage.datacite.org/' + this.doi;
    }
  }),
  isDraft: equal('state', 'draft'),
  showCitation: computed('registered', 'client', function () {
    return (
      this.registered ||
      w(
        'crossref.citations medra.citations kisti.citations jalc.citations op.citations'
      ).includes(this.repository.get('id'))
    );
  }),
  schemaVersionString: computed('schemaVersion', function () {
    if (this.schemaVersion) {
      return A(this.schemaVersion.split('-')).get('lastObject');
    } else {
      return null;
    }
  }),
  title: computed('titles', function () {
    if (this.titles.length > 0) {
      return A(this.titles).get('firstObject').get('title');
    } else {
      return null;
    }
  }),
  description: computed('descriptions', function () {
    if (this.descriptions.length > 0) {
      return A(this.descriptions).get('firstObject').get('description');
    } else {
      return null;
    }
  })
});
