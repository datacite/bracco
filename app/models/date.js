

import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  dateType: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.date', function() {
        return this.model.get('date') == null;
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  date: DS.attr('string'),
  dateType: DS.attr('string'),
  dateInformation: DS.attr('string'),
});
