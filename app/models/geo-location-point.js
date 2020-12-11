import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  pointLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ pointLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180
    }),
    validator('presence', {
      presence: true
    })
  ],
  pointLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ pointLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90
    }),
    validator('presence', {
      presence: true
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  pointLongitude: attr('number', { defaultValue: null }),
  pointLatitude: attr('number', { defaultValue: null })
});
