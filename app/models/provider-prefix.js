import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  prefix: [validator('presence', true)]
});

export default Model.extend(Validations, {
  provider: belongsTo('provider', {
    async: true
  }),
  prefix: belongsTo('prefix', {
    async: true
  }),
  repositories: hasMany('repository', {
    async: true
  }),
  'repository-prefixes': hasMany('repository-prefix', {
    async: true
  }),

  createdAt: attr('date')
});
