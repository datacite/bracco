import { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  westBoundLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ westBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message:
        'westBoundLongitude must be included if you input a GeoLocation Box.',
      disabled: computed(
        'model.{state,eastBoundLongitude,southBoundLatitude,northBoundLatitude}',
        function () {
          return (
            this.model.state === 'draft' ||
            (isBlank(this.model.eastBoundLongitude) &&
              isBlank(this.model.southBoundLatitude) &&
              isBlank(this.model.northBoundLatitude))
          );
        }
      )
    })
  ],
  eastBoundLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ eastBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message:
        'eastBoundLongitude must be included if you input a GeoLocation Box.',
      disabled: computed(
        'model.{state,westBoundLongitude,southBoundLatitude,northBoundLatitude}',
        function () {
          return (
            this.model.state === 'draft' ||
            (isBlank(this.model.westBoundLongitude) &&
              isBlank(this.model.southBoundLatitude) &&
              isBlank(this.model.northBoundLatitude))
          );
        }
      )
    })
  ],
  southBoundLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ southBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message:
        'southBoundLatitude must be included if you input a GeoLocation Box.',
      disabled: computed(
        'model.{state,westBoundLongitude,eastBoundLongitude,northBoundLatitude}',
        function () {
          return (
            this.model.state === 'draft' ||
            (isBlank(this.model.westBoundLongitude) &&
              isBlank(this.model.eastBoundLongitude) &&
              isBlank(this.model.northBoundLatitude))
          );
        }
      )
    })
  ],
  northBoundLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ northBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message:
        'northBoundLatitude must be included if you input a GeoLocation Box.',
      disabled: computed(
        'model.{eastBoundLongitude,southBoundLatitude,westBoundLongitude}',
        function () {
          return (
            isBlank(this.model.eastBoundLongitude) &&
            isBlank(this.model.southBoundLatitude) &&
            isBlank(this.model.westBoundLongitude)
          );
        }
      )
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  southBoundLatitude: attr('number', { defaultValue: null }),
  northBoundLatitude: attr('number', { defaultValue: null }),
  westBoundLongitude: attr('number', { defaultValue: null }),
  eastBoundLongitude: attr('number', { defaultValue: null })
});
