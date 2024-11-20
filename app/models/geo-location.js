import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class GeoLocation extends Fragment {
  @attr('string', { defaultValue: null })
  geoLocationPlace;

  @fragment('geoLocationPoint', { defaultValue: {} })
  geoLocationPoint;

  @fragment('geoLocationBox', { defaultValue: {} })
  geoLocationBox;
}
