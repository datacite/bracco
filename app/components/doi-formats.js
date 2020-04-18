import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('formats')) {
      this.model.set('formats', []);
    }
  },
  actions: {
    addFormat() {
      this.model.get('formats').pushObject();
    },
  },
});
