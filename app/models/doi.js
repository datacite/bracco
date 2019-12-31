import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from 'bracco/config/environment';
import Model, { belongsTo, attr } from '@ember-data/model';
import { fragmentArray } from 'ember-data-model-fragments/attributes';
import { w } from '@ember/string';
import { A } from '@ember/array';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: computed('model.mode', 'model.state', 'model.prefix', function () {
        return !["new", "edit"].includes(this.model.get('mode')) || this.get('model.state') === 'draft';
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
        return this.get('model.state') === 'draft';
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
        return this.get('model.state') === 'draft';
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
        return this.get('model.state') === 'draft';
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
        return this.get('model.state') === 'draft';
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
        return !["upload", "modify"].includes(this.model.get('mode')) || this.get('model.state') === 'draft';
      }),
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      isWarning: computed('model.mode', 'model.state', 'model.prefix', function () {
        return this.get('model.state') === 'draft';
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
  repository: belongsTo('repository', {
    async: true
  }),

  doi: attr('string'),
  identifiers: attr(),
  confirmDoi: attr('string', { defaultValue: null }),
  prefix: attr('string'),
  suffix: attr('string'),
  url: attr('string'),
  contentUrl: attr(),
  creators: fragmentArray('creator'),
  titles: fragmentArray('title'),
  publisher: attr('string'),
  bcontainer: attr(),
  publicationYear: attr('number'),
  subjects: attr(),
  contributors: attr(),
  dates: attr(),
  language: attr(),
  types: attr(),
  relatedIdentifiers: attr(),
  sizes: attr(),
  formats: attr(),
  version: attr('string'),
  rightsList: attr(),
  descriptions: fragmentArray('description', { defaultValue: [] }),
  geoLocations: attr(),
  fundingReferences: attr(),
  landingPage: attr(),
  xml: attr('xml'),
  metadataVersion: attr('string'),
  schemaVersion: attr('string'),
  source: attr('string', { defaultValue: "fabrica" }),
  state: attr('string'),
  breason: attr('string', { defaultValue: null }),
  isActive: attr('boolean', { defaultValue: true }),
  event: attr('string'),
  created: attr('date'),
  registered: attr('date'),
  updated: attr('date'),
  mode: attr('string'),

  identifier: computed('doi', 'repository', function () {
    if (ENV.API_URL == "https://api.datacite.org" || (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.repository.get('id')))) {
      return "https://doi.org/" + this.doi;
    } else {
      return "https://handle.test.datacite.org/" + this.doi;
    }
  }),
  isDraft: computed('state', function () {
    return this.state === 'draft';
  }),
  showCitation: computed('registered', 'client', function () {
    return (this.registered || (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.repository.get('id'))));
  }),
  schemaVersionString: computed('schemaVersion', function () {
    if (this.schemaVersion) {
      return A(this.schemaVersion.split("-")).get("lastObject");
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
  }),
});
