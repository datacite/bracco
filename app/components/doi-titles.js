import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (this.model.get('titles').length == 0) {
      this.model.get('titles').createFragment();
    }
  },

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    }
  }
});
