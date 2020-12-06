import Component from '@ember/component';

export default Component.extend({
  showSizes: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.sizes) {
      this.model.set('sizes', []);
    }
  },
  actions: {
    addSize() {
      this.model.sizes.pushObject();
      this.set('showSizes', true);
    },
    toggleSizes() {
      this.set('showSizes', !this.showSizes);
    }
  }
});
