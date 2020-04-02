

import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  dateType: [
    validator('presence', {
      presence: true,
      message: 'Date type must be included when adding a Date',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.date', function() {
        return this.model.get('date') == null;
      }),
    }),
  ],
  date: [
    validator('date-format', {
      allowBlank: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  date: DS.attr('string'),
  dateType: DS.attr('string'),
  dateInformation: DS.attr('string'),
});
