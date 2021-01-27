import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('email-format', {
      allowBlank: true
    })
  ]
});

export default Model.extend(Validations, {
  provider: belongsTo('provider', {
    async: true
  }),

  meta: attr(),

  email: attr('string'),
  givenName: attr('string'),
  familyName: attr('string'),
  name: attr('string'),
  created: attr('date'),
  updated: attr('date'),
  deleted: attr('date')
});
