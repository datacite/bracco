import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class DoiGeoLocation extends Component {
  @action
  updateGeoLocationPlace(value) {
    this.fragment.set('geoLocationPlace', value);
  }

  @action
  updateGeoLocationPointLongitude(value) {
    this.fragment.set('geoLocationPoint.pointLongitude', value);
  }

  @action
  updateGeoLocationPointLatitude(value) {
    this.fragment.set('geoLocationPoint.pointLatitude', value);
  }

  @action
  updateGeoLocationBoxWestLongitude(value) {
    this.fragment.set('geoLocationBox.westBoundLongitude', value);
  }

  @action
  updateGeoLocationBoxEastLongitude(value) {
    this.fragment.set('geoLocationBox.eastBoundLongitude', value);
  }

  @action
  updateGeoLocationBoxNorthLatitude(value) {
    this.fragment.set('geoLocationBox.northBoundLatitude', value);
  }

  @action
  updateGeoLocationBoxSouthLatitude(value) {
    this.fragment.set('geoLocationBox.southBoundLatitude', value);
  }

  @action
  deleteGeoLocation() {
    this.model.get('geoLocations').removeObject(this.fragment);
  }
}
// updateGeoLocationPointLongitude
