import Model, { attr } from '@ember-data/model';
import { union } from '@ember/object/computed';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  repositoryUrl: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false
    })
  ]
});

export default Model.extend(Validations, {
  re3dataId: attr('string'),
  repositoryName: attr('string'),
  additionalNames: attr(),
  description: attr('string'),
  repositoryUrl: attr('string'),
  repositoryContacts: attr(),
  repositoryLanguages: attr(),
  software: attr(),
  subjects: attr(),
  certificates: attr(),
  dataUploads: attr(),
  dataAccesses: attr(),
  types: attr(),
  created: attr('date'),
  updated: attr('date'),

  name: computed('repositoryName', function () {
    return this.repositoryName;
  }),

  // combine subject areas and keywords
  tags: union('subjects', 'keywords')
});
