import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  prefix: [
    validator('presence', true)
  ]
});

export default Model.extend(Validations, {
  provider: belongsTo('provider', {
    async: false
  }),
  prefix: belongsTo('prefix', {
    async: false
  }),
  repositories: hasMany('repository', {
    async: false
  }),

  created: attr('date')
});
