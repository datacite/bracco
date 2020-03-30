import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('formats')) {
      this.model.set('formats', []);
    }
    if (this.model.get('formats').length == 0) {
      this.model.get('formats').pushObject();
    }
  },
  actions: {
    addFormat() {
      this.model.get('formats').pushObject();
    },
  },
});
