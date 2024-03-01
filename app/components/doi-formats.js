import Component from '@ember/component';

export default Component.extend({
  showFormats: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('formats')) {
      this.model.set('formats', []);
    }
  },
  actions: {
    addFormat() {
      this.model.get('formats').push('');
      this.model.set('formats', Array.from(this.model.get('formats')));
      this.set('showFormats', true);
    },
    toggleFormats() {
      this.set('showFormats', !this.showFormats);
    }
  }
});
