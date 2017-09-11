import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  // email: [
  //   validator('format', { type: 'email' })
  // ]
});

export default DS.Model.extend(Validations, {
  user: DS.hasMany('user', {
    async: false
  }),

  name: DS.attr('string'),
  updated: DS.attr('date')
});
