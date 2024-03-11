import Component from '@ember/component';

export default Component.extend({
  actions: {
    updateGeoLocationPlace(value) {
      this.fragment.set('geoLocationPlace', value);
    },
    updateGeoLocationPointLongitude(value) {
      this.fragment.set('geoLocationPoint.pointLongitude', value);
    },
    updateGeoLocationPointLatitude(value) {
      this.fragment.set('geoLocationPoint.pointLatitude', value);
    },
    updateGeoLocationBoxWestLongitude(value) {
      this.fragment.set('geoLocationBox.westBoundLongitude', value);
    },
    updateGeoLocationBoxEastLongitude(value) {
      this.fragment.set('geoLocationBox.eastBoundLongitude', value);
    },
    updateGeoLocationBoxNorthLatitude(value) {
      this.fragment.set('geoLocationBox.northBoundLatitude', value);
    },
    updateGeoLocationBoxSouthLatitude(value) {
      this.fragment.set('geoLocationBox.southBoundLatitude', value);
    },
    deleteGeoLocation() {
      this.model.get('geoLocations').removeObject(this.fragment);
    }
  }
});
// updateGeoLocationPointLongitude
