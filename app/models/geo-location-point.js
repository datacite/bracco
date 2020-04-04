import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

import { validator, buildValidations } from 'ember-cp-validations';
// import MF from 'ember-data-model-fragments';


const Validations = buildValidations({
  pointLongitude: [
    validator('number', {
      allowString: true,
      gte: -90,
      lte: 90,
    }),
  ],
  pointLatitude: [
    validator('number', {
      allowString: true,
      gte: -180,
      lte: 180,
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  pointLongitude: DS.attr('number'),
  pointLatitude: DS.attr('number'),
});

