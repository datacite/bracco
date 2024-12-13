// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiGeoLocation extends Component {
  @action
  updateGeoLocationPlace(value) {
    this.fragment.geoLocationPlace = value;
  }

  @action
  updateGeoLocationPointLongitude(value) {
    this.fragment.geoLocationPoint.pointLongitude = value;
  }

  @action
  updateGeoLocationPointLatitude(value) {
    this.fragment.geoLocationPoint.pointLatitude = value;
  }

  @action
  updateGeoLocationBoxWestLongitude(value) {
    this.fragment.geoLocationBox.westBoundLongitude = value;
  }

  @action
  updateGeoLocationBoxEastLongitude(value) {
    this.fragment.geoLocationBox.eastBoundLongitude = value;
  }

  @action
  updateGeoLocationBoxNorthLatitude(value) {
    this.fragment.geoLocationBox.northBoundLatitude = value;
  }

  @action
  updateGeoLocationBoxSouthLatitude(value) {
    this.fragment.geoLocationBox.southBoundLatitude = value;
  }

  @action
  deleteGeoLocation() {
    this.model.geoLocations.removeObject(this.fragment);
  }
}
// updateGeoLocationPointLongitude
