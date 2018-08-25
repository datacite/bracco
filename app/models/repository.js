import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  client: DS.belongsTo('client', {
    async: true
  }),

  name: DS.attr('string'),
  additionalName: DS.attr('string'),
  description: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  repositoryContact: DS.attr('string'),
  repositorySoftware: DS.attr('string'),
  subject: DS.attr(),
  updated: DS.attr('date')
});
