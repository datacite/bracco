import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('sizes')) {
      this.model.set('sizes', []);
    }
    if (this.model.get('sizes').length == 0) {
      this.model.get('sizes').pushObject();
    }
  },
  actions: {
    addSize() {
      this.model.get('sizes').pushObject();
    },
  },
});
