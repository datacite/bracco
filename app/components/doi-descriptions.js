import Component from '@ember/component';

export default Component.extend({
  showDescriptions: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('descriptions')) {
      this.model.set('descriptions', []);
    }
  },

  actions: {
    addDescription() {
      this.model.get('descriptions').createFragment();
      this.set('showDescriptions', true);
    },
    toggleDescriptions() {
      this.set('showDescriptions', !this.get('showDescriptions'));
    },
  },
});
