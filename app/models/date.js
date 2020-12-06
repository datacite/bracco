import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed, not } from '@ember/object/computed';

const Validations = buildValidations({
  dateType: [
    validator('presence', {
      presence: true,
      message: 'Date type must be included when adding a Date',
      disabled: not('model.date', function () {
        this.model.date;
      })
    })
  ],
  date: [
    validator('date-format', {
      allowBlank: true,
      disabled: computed('model.state', function () {
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
