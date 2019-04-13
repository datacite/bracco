import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isValidating: computed.notEmpty('model.validations.attrs.descriptions.warnings').readOnly(),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('descriptions')) {
      this.model.set('descriptions', []);
    }
    if (this.model.get('descriptions').length == 0) {
      this.model.get('descriptions').createFragment();
    }
  },

  actions: {
    addDescription() {
      this.model.get('descriptions').createFragment();
    }
  }
});
