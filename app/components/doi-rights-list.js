import Component from '@ember/component';

export default Component.extend({
  showRights: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.rightsList) {
      this.model.set('rightsList', []);
    }
  },

  actions: {
    addRights() {
      this.model.rightsList.createFragment();
      this.set('showRights', true);
    },
    toggleRights() {
      this.set('showRights', !this.showRights);
    }
  }
});
