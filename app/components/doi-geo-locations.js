import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('geoLocations')) {
      this.model.set('geoLocations', []);
    }
    if (this.model.get('geoLocations').length == 0) {
      this.model.get('geoLocations').createFragment();
    }
  },

  actions: {
    addGeoLocation() {
      this.model.get('geoLocations').createFragment();
    },
  },
});
