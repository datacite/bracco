import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { reads } from '@ember/object/computed';

const Validations = buildValidations({
  dateType: [
    validator('presence', {
      presence: true
    })
  ],
  date: [
    validator('presence', {
      presence: true
    }),
    validator('date-format', {
      disabled: reads('model.state', function () {
        return this.model.state === 'draft';
      })
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  date: attr('string'),
  dateType: attr('string'),
  dateInformation: attr('string')
});
