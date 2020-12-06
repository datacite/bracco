import Component from '@ember/component';

export default Component.extend({
  showFormats: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.formats) {
      this.model.set('formats', []);
    }
  },
  actions: {
    addFormat() {
      this.model.formats.pushObject();
      this.set('showFormats', true);
    },
    toggleFormats() {
      this.set('showFormats', !this.showFormats);
    }
  }
});
