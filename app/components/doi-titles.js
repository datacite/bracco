import Component from '@ember/component';

export default Component.extend({
  showTitles: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.titles) {
      this.model.set('titles', []);
    }
    if (this.model.titles.length == 0) {
      this.model.titles.createFragment();
    }
  },

  actions: {
    addTitle() {
      this.model.titles.createFragment();
      this.set('showTitles', true);
    },
    toggleTitles() {
      this.set('showTitles', !this.showTitles);
    }
  }
});
