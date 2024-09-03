import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { reads, equal } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from 'bracco/config/environment';
import Model, { attr, belongsTo } from '@ember-data/model';
import { fragment, fragmentArray } from 'ember-data-model-fragments/attributes';
import { A } from '@ember/array';

const Validations = buildValidations({
  details: [
    validator('belongs-to', {
      disabled: computed('model.{mode,state}', function () {
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
  'publisher.name': [
    validator('presence', {
      presence: true,
      disabled: computed('model.{mode,state}', function () {
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
      disabled: computed('model.{mode,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    }),
    validator('date', {
      onOrAfter: '1000',
      onOrBefore: computed('model.maxMintFutureOffset', function () {
        let mydate = (
          new Date().getFullYear() +
          Number(this.model.get('maxMintFutureOffset'))
        ).toString();
        return mydate;
      }),
      precision: 'year',
      format: 'YYYY',
      errorFormat: 'YYYY',
      message: computed('model.maxMintFutureOffset', function () {
        return `Must be a year between 1000 and ${
          new Date().getFullYear() + this.model.get('maxMintFutureOffset')
        }.`;
      }),
      disabled: computed('model.{mode,state}', function () {
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
      disabled: computed('model.{mode,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['new', 'edit'].includes(this.model.get('mode'))
        );
      })
    }),
    validator('resource-type', {
      presence: true,
      disabled: computed('model.{mode,state}', function () {
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
      disabled: computed('model.{mode,state}', function () {
        return (
          !['upload', 'modify'].includes(this.model.get('mode')) ||
          this.model.get('state') === 'draft'
        );
      })
    }),
    validator('metadata', {
      allowBlank: true,
      dependentKeys: ['model.doi'],
      disabled: computed('model.{mode,state}', function () {
        return (
          this.model.get('state') === 'draft' ||
          !['upload', 'modify'].includes(this.model.get('mode'))
        );
      })
    })
  ],
  language: [
    validator('format', {
      allowBlank: true,
      regex: /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/,
      message: 'Must be a valid Language code.'
    })
  ]
});

@classic
export default class Doi extends Model.extend(Validations) {
  @belongsTo('repository', {
    async: true
  })
  repository;

  @attr('string')
  doi;

  @attr('string', { defaultValue: null })
  confirmDoi;

  @attr('string')
  prefix;

  @attr('string')
  suffix;

  @attr('string')
  url;

  @attr()
  contentUrl;

  @fragmentArray('creator', { defaultValue: [] })
  creators;

  @fragmentArray('title', { defaultValue: [] })
  titles;

  @fragment('publisher', { defaultValue: {} })
  publisher;

  @attr()
  bcontainer;

  @attr('number')
  publicationYear;

  @fragmentArray('subject', { defaultValue: [] })
  subjects;

  @fragmentArray('contributor', { defaultValue: [] })
  contributors;

  @fragmentArray('alternateIdentifier', {
    defaultValue: []
  })
  alternateIdentifiers;

  @fragmentArray('date', { defaultValue: [] })
  dates;

  @attr('string')
  language;

  @attr()
  types;

  @fragmentArray('relatedIdentifier', { defaultValue: [] })
  relatedIdentifiers;

  @attr('array')
  sizes;

  @attr('array')
  formats;

  @attr('string')
  version;

  @fragmentArray('rights', { defaultValue: [] })
  rightsList;

  @fragmentArray('description', { defaultValue: [] })
  descriptions;

  @fragmentArray('geoLocation', { defaultValue: [] })
  geoLocations;

  @fragmentArray('fundingReference', { defaultValue: [] })
  fundingReferences;

  @fragmentArray('relatedItem', { defaultValue: [] })
  relatedItems;

  @attr()
  landingPage;

  @attr('xml')
  xml;

  @attr('string')
  metadataVersion;

  @attr('string')
  schemaVersion;

  @attr('string', { defaultValue: 'fabrica' })
  source;

  @attr('string')
  state;

  @attr('string', { defaultValue: null })
  breason;

  @attr('boolean', { defaultValue: true })
  isActive;

  @attr('string')
  event;

  @attr('date')
  created;

  @attr('date')
  registered;

  @attr('date')
  updated;

  @attr('string')
  mode;

  @attr()
  meta;

  @attr('number')
  citationCount;

  @attr('number')
  viewCount;

  @attr('number')
  downloadCount;

  @computed('doi', 'repository')
  get identifier() {
    return ENV.HANDLE_SERVER + '/' + this.doi;
  }

  @equal('state', 'draft')
  isDraft;

  @reads('registered')
  showCitation;

  @computed('schemaVersion')
  get schemaVersionString() {
    if (this.schemaVersion) {
      return A(this.schemaVersion.split('-')).get('lastObject');
    } else {
      return null;
    }
  }

  @computed('titles.length')
  get title() {
    if (this.titles.length > 0) {
      return A(this.titles).get('firstObject').get('title');
    } else {
      return null;
    }
  }

  @computed('descriptions.length')
  get description() {
    if (this.descriptions.length > 0) {
      return A(this.descriptions).get('firstObject').get('description');
    } else {
      return null;
    }
  }

  @computed
  get maxMintFutureOffset() {
    return ENV.MAX_MINT_FUTURE_OFFSET;
  }
}
