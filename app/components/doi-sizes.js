import Component from '@ember/component';

export default Component.extend({
  showSizes: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('sizes')) {
      this.model.set('sizes', []);
    }
  },
  actions: {
    addSize() {
      this.model.get('sizes').push('');
      this.model.set('sizes', Array.from(this.model.get('sizes')));
      this.set('showSizes', true);
    },
    toggleSizes() {
      this.set('showSizes', !this.showSizes);
    },
  },
});
