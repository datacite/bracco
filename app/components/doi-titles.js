import Component from '@ember/component';

export default Component.extend({
  showTitles: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('titles')) {
      this.model.set('titles', []);
    }
    if (this.model.get('titles').length == 0) {
      this.model.get('titles').createFragment();
    }
  },

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
      this.set('showTitles', true);
    },
    toggleTitles() {
      this.set('showTitles', !this.get('showTitles'));
    },
  },
});
