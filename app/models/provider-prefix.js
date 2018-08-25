import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  prefix: [
    validator('presence', true)
  ]
});

export default DS.Model.extend(Validations, {
  provider: DS.belongsTo('provider', {
    async: true
  }),
  prefix: DS.belongsTo('prefix', {
    async: true
  }),

  created: DS.attr('date')
});
