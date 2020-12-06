import Component from '@ember/component';

export default Component.extend({
  showGeoLocations: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.geoLocations) {
      this.model.set('geoLocations', []);
    }
  },

  actions: {
    addGeoLocation() {
      this.model.geoLocations.createFragment();
      this.set('showGeoLocations', true);
    },
    toggleGeoLocations() {
      this.set('showGeoLocations', !this.showGeoLocations);
    }
  }
});
