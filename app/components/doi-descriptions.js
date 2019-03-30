import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isValidating: computed.notEmpty('model.validations.attrs.descriptions.warnings').readOnly(),

  actions: {
    addDescription() {
      if (!this.model.get('descriptions')) {
        this.model.set('descriptions', []);
      }
      this.model.get('descriptions').createFragment();
    }
  }
});
