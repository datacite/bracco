import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import ENV from 'bracco/config/environment';
import {
  array,
  fragment,
  fragmentArray
} from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import isEmpty from 'bracco/utils/is-empty';
import validatePwdInputs from 'bracco/utils/validate-pwd-inputs';
import { inject as service } from '@ember/service';

export const clientTypeList = [
  {
    label: 'Repository',
    value: 'repository'
  },
  {
    label: 'Periodical',
    value: 'periodical'
  },
  {
    label: 'IGSN ID Catalog',
    value: 'igsnCatalog'
  },
  {
    label: 'RAiD Registry',
    value: 'raidRegistry'
  }
];

export const softwareList = [
  'Cayuse',
  'CKAN',
  'Dataverse',
  'dLibra',
  'DSpace',
  'EPrints',
  'Ex Libris Esploro',
  'Fedora',
  'Figshare',
  'Invenio',
  'Islandora',
  'MyCoRe',
  'Nesstar',
  'Omega-PSIR',
  'Omeka S',
  'Open Journal Systems (OJS)',
  'OPUS',
  'Pubman',
  'Pure',
  'Redivis',
  'Samvera',
  'Ubiquity',
  'Other'
];

const Validations = buildValidations({
  symbol: [
    validator('presence', true),
    validator('unique-repository-id', {
      presence: true,
      disabled: computed('model', function () {
        return !this.model.get('isNew');
      })
    }),
    validator('format', {
      regex: /^[A-Z]+\.[A-Z0-9]+(-[A-Z0-9]+)?$/,
      message:
        'The Repository ID must start with the Member ID, followed by a dot. It can then contain only upper case letters, numbers, and at most one hyphen.'
    }),
    validator('length', {
      min: 5,
      max: 18
    })
  ],
  confirmSymbol: [
    validator('presence', {
      presence: true,
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    }),
    validator('confirmation', {
      on: 'symbol',
      message: 'Repository ID does not match',
      disabled: computed('model', function () {
        return this.model.get('isNew');
      })
    })
  ],
  passwordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', 'model.router.currentRouteName', function () {
        return !validatePwdInputs(this.model.router.currentRouteName);
      })
    }),
    validator('length', {
      min: 8,
      disabled: computed('model', 'model.router.currentRouteName', function () {
        return !validatePwdInputs(this.model.router.currentRouteName);
      })
    })
  ],
  confirmPasswordInput: [
    validator('presence', {
      presence: true,
      disabled: computed('model', 'model.router.currentRouteName', function () {
        return !validatePwdInputs(this.model.router.currentRouteName);
      })
    }),
    validator('confirmation', {
      on: 'passwordInput',
      message: 'Password does not match',
      disabled: computed('model', 'model.router.currentRouteName', function () {
        return !validatePwdInputs(this.model.router.currentRouteName);
      })
    })
  ],
  name: validator('presence', true),
  systemEmail: [validator('presence', true), validator('email-format', true)],
  salesforceId: [
    validator('format', {
      regex: /[a-zA-Z0-9]{18}/,
      allowBlank: true,
      message: 'Please enter a valid 18 digit Salesforce ID.'
    })
  ],
  globusUuid: [
    validator('uuid-format', {
      version: 4,
      allowBlank: true,
      message: 'Must be a valid UUID (version 4).'
    })
  ],
  'issn.issnl': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN-L is in the wrong format.'
    })
  ],
  'issn.electronic': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN (electronic) is in the wrong format.'
    })
  ],
  'issn.print': [
    validator('issn-format', {
      allowBlank: true,
      message: 'ISSN (print) is in the wrong format.'
    })
  ]
});

export default Model.extend(Validations, {
  router: service(),

  provider: belongsTo('provider', {
    async: true
  }),
  prefixes: hasMany('prefix', {
    async: true
  }),
  meta: attr(),

  name: attr('string'),
  alternateName: attr('string'),
  symbol: attr('string'),
  globusUuid: attr('string'),
  re3data: attr('string'),
  domains: attr('string', { defaultValue: '*' }),
  systemEmail: attr('string'),
  salesforceId: attr('string'),
  analyticsTrackingId: attr('string'),
  year: attr('number'),
  description: attr('string'),
  language: array(),
  certificate: array(),
  serviceContact: fragment('contact-fragment'),
  issn: fragment('issn'),
  url: attr('string'),
  clientType: attr('string'),
  repositoryType: array(),
  software: attr('string'),
  isActive: attr('boolean', { defaultValue: true }),
  passwordInput: attr('string'),
  hasPassword: attr('boolean'),
  created: attr('date'),
  updated: attr('date'),
  subjects: fragmentArray('subject', { defaultValue: [] }),
  targetId: attr(),
  mode: attr('string'),

  domainList: computed('domains', function () {
    return this.domains.split(',').map(function (item) {
      return item.trim();
    });
  }),

  badgeUrl: computed('re3data', function () {
    if (this.re3data) {
      return (
        ENV.API_URL +
        '/re3data/' +
        this.re3data.substr(this.re3data.indexOf('1')) +
        '/badge'
      );
    } else {
      return null;
    }
  }),

  get isDisciplinary() {
    return this.repositoryType.includes('disciplinary');
  },

  clearSubjects() {
    this.subjects = [];
  },
  certifyDisciplinaryRepository() {
    if (!this.isDisciplinary) {
      this.clearSubjects();
    }
  }
});
