import Component from '@ember/component';

export default Component.extend({
  showDescriptions: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.descriptions) {
      this.model.set('descriptions', []);
    }
  },

  actions: {
    addDescription() {
      this.model.descriptions.createFragment();
      this.set('showDescriptions', true);
    },
    toggleDescriptions() {
      this.set('showDescriptions', !this.showDescriptions);
    }
  }
});
