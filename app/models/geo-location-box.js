import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import MF from 'ember-data-model-fragments';

const Validations = buildValidations({
  westBoundLongitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -180.00 ≤ westBoundLongitude ≤ 180.00 ',
      gte: -90,
      lte: 90,
    }),
  ],
  eastBoundLongitude: [
    validator('number', {
      allowString: true,
      gte: -90,
      lte: 90,
    }),
  ],
  southBoundLatitude: [
    validator('number', {
      allowString: true,
      gte: -180,
      lte: 180,
    }),
  ],
  northBoundLatitude: [
    validator('number', {
      allowString: true,
      gte: -180,
      lte: 180,
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  southBoundLatitude: DS.attr('number'),
  northBoundLatitude: DS.attr('number'),
  westBoundLongitude: DS.attr('number'),
  eastBoundLongitude: DS.attr('number'),
});