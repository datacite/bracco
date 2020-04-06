import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

import { validator, buildValidations } from 'ember-cp-validations';
// import MF from 'ember-data-model-fragments';


const Validations = buildValidations({
  pointLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ pointLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Point Longitude must be included if you input a GeoLocation Point.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.pointLatitude', function() {
        return isBlank(this.model.get('pointLatitude'));
      }),
    }),
  ],
  pointLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ pointLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Point Latitude must be included if you input a GeoLocation Point.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.pointLongitude', function() {
        return isBlank(this.model.get('pointLongitude'));
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  pointLongitude: DS.attr('number',{ defaultValue: null }),
  pointLatitude: DS.attr('number',{ defaultValue: null }),
});

