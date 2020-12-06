import Component from '@ember/component';

export default Component.extend({
  showDates: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.dates) {
      this.model.set('dates', []);
    }
  },
  actions: {
    addDate() {
      this.model.dates.createFragment();
      this.set('showDates', true);
    },
    toggleDates() {
      this.set('showDates', !this.showDates);
    }
  }
});
