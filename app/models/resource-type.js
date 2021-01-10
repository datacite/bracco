import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true)
});

export default Model.extend(Validations, {
  title: attr('string'),
  updated: attr('date')
});
