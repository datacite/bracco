import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('sizes')) {
      this.model.set('sizes', []);
    }
  },
  actions: {
    addSize() {
      this.model.get('sizes').pushObject();
    },
  },
});
