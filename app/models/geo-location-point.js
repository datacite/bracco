import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

import { validator, buildValidations } from 'ember-cp-validations';
// import MF from 'ember-data-model-fragments';


const Validations = buildValidations({
  pointLongitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -180.00 ≤ pointLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
  ],
  pointLatitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -90.00 ≤ pointLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  pointLongitude: DS.attr('number'),
  pointLatitude: DS.attr('number'),
});

