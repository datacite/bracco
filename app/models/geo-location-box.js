import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import Fragment from 'ember-data-model-fragments/fragment';
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
        'model.{eastBoundLongitude,southBoundLatitude,northBoundLatitude,state}',
        function () {
          return (
            this.model.get('state') === 'draft' ||
            (isBlank(this.model.get('eastBoundLongitude')) &&
              isBlank(this.model.get('southBoundLatitude')) &&
              isBlank(this.model.get('northBoundLatitude')))
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
        'model.{eastBoundLongitude,southBoundLatitude,northBoundLatitude,state}',
        function () {
          return (
            this.model.get('state') === 'draft' ||
            (isBlank(this.model.get('westBoundLongitude')) &&
              isBlank(this.model.get('southBoundLatitude')) &&
              isBlank(this.model.get('northBoundLatitude')))
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
        'model.{eastBoundLongitude,southBoundLatitude,northBoundLatitude,state}',
        function () {
          return (
            this.model.get('state') === 'draft' ||
            (isBlank(this.model.get('westBoundLongitude')) &&
              isBlank(this.model.get('eastBoundLongitude')) &&
              isBlank(this.model.get('northBoundLatitude')))
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
        'model.{eastBoundLongitude,southBoundLatitude,northBoundLatitude}',
        function () {
          return (
            isBlank(this.model.get('eastBoundLongitude')) &&
            isBlank(this.model.get('southBoundLatitude')) &&
            isBlank(this.model.get('westBoundLongitude'))
          );
        }
      )
    })
  ]
});

@classic
export default class GeoLocationBox extends Fragment.extend(Validations) {
  @attr('number', { defaultValue: null })
  southBoundLatitude;

  @attr('number', { defaultValue: null })
  northBoundLatitude;

  @attr('number', { defaultValue: null })
  westBoundLongitude;

  @attr('number', { defaultValue: null })
  eastBoundLongitude;
}
