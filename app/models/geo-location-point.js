import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { isBlank } from '@ember/utils';
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
      presence: true,
      ignoreBlank: true,
      message:
        'Point Longitude must be included if you input a GeoLocation Point.',
      disabled: computed('model.pointLatitude', function () {
        return isBlank(this.model.get('pointLatitude'));
      })
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
      presence: true,
      ignoreBlank: true,
      message:
        'Point Latitude must be included if you input a GeoLocation Point.',
      disabled: computed('model.pointLongitude', function () {
        return isBlank(this.model.get('pointLongitude'));
      })
    })
  ]
});

@classic
export default class GeoLocationPoint extends Fragment.extend(Validations) {
  @attr('number', { defaultValue: null })
  pointLongitude;

  @attr('number', { defaultValue: null })
  pointLatitude;
}
