import DS from 'ember-data';
import { union } from '@ember/object/computed';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  repositoryUrl: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
    }),
  ],
});

export default DS.Model.extend(Validations, {
  re3dataId: DS.attr('string'),
  repositoryName: DS.attr('string'),
  additionalNames: DS.attr(),
  description: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  repositoryContacts: DS.attr(),
  repositoryLanguages: DS.attr(),
  software: DS.attr(),
  subjects: DS.attr(),
  certificates: DS.attr(),
  dataUploads: DS.attr(),
  dataAccesses: DS.attr(),
  types: DS.attr(),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  name: computed('repositoryName', function() {
    return this.repositoryName;
  }),

  // combine subject areas and keywords
  tags: union('subjects', 'keywords'),
});
