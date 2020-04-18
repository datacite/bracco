import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('rightsList')) {
      this.model.set('rightsList', []);
    }
  },

  actions: {
    addRights() {
      this.model.get('rightsList').createFragment();
    },
  },
});
