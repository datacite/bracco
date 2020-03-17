import Component from '@ember/component';

export default Component.extend({


  actions: {
    updateGeoLocationPlace(value) {
      this.fragment.set('geoLocationPlace', value);
    },
    deleteGeoLocation() {
      this.model.get('geoLocations').removeObject(this.fragment);
    },
  },
});
