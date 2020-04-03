import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('rightsList')) {
      this.model.set('rightsList', []);
    }
    if (this.model.get('rightsList').length == 0) {
      this.model.get('rightsList').createFragment();
    }
  },

  actions: {
    addRights() {
      this.model.get('rightsList').createFragment();
    },
  },
});
