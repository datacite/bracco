import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  hasErrors: false,
  validations: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.model.get('titles').length == 0) {
      this.model.get('titles').createFragment();
    }
  },

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    },
    setValidations(value) {
      this.set('validations', value);
    },
  }
});
