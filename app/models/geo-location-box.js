import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import MF from 'ember-data-model-fragments';

const Validations = buildValidations({
  westBoundLongitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -180.00 ≤ westBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
  ],
  eastBoundLongitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -180.00 ≤ eastBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
  ],
  southBoundLatitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -90.00 ≤ southBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
  ],
  northBoundLatitude: [
    validator('number', {
      allowString: true,
      message: 'Domain: -90.00 ≤ northBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  southBoundLatitude: DS.attr('number'),
  northBoundLatitude: DS.attr('number'),
  westBoundLongitude: DS.attr('number'),
  eastBoundLongitude: DS.attr('number'),
});