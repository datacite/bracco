import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragment } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  geoLocationPlace: DS.attr('string', { defaultValue: null }),
  geoLocationPoint: fragment('geoLocationPoint',{ defaultValue: {} }),
  geoLocationBox: fragment('geoLocationBox', { defaultValue: {} }),
});
