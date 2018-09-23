import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  client: DS.belongsTo('client', {
    async: true
  }),

  repositoryName: DS.attr('string'),
  additionalNames: DS.attr(),
  description: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  repositoryContacts: DS.attr(),
  software: DS.attr(),
  subjects: DS.attr(),
  certificates: DS.attr(),
  dataUploads: DS.attr(),
  dataAccesses: DS.attr(),
  types: DS.attr(),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  // combine subject areas and keywords
  tags: Ember.computed.union('subjects', 'keywords'),
});
