import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragment } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  geoLocationPlace: attr('string', { defaultValue: null }),
  geoLocationPoint: fragment('geoLocationPoint', { defaultValue: {} }),
  geoLocationBox: fragment('geoLocationBox', { defaultValue: {} })
});
