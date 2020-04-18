import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('dates')) {
      this.model.set('dates', []);
    }
  },
  actions: {
    addDate() {
      this.model.get('dates').createFragment();
    },
  },
});
