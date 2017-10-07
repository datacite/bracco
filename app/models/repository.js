import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  user: DS.belongsTo('client', {
    async: false
  }),

  name: DS.attr('string'),
  updated: DS.attr('date')
});
