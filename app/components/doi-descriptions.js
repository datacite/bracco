import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('descriptions')) {
      this.model.set('descriptions', []);
    }
    if (this.model.get('descriptions').length == 0) {
      this.model.get('descriptions').createFragment();
    }

    this.setValidationClass();
  },

  setValidationClass() {
    if (this.model.get('validations.attrs.descriptions.errors').length > 0) {
      this.set('validationClass', 'has-error');
    } else if (this.model.get('validations.attrs.descriptions.warnings').length > 0) {
      this.set('validationClass', 'has-warning');
    } else {
      this.set('validationClass', null);
    }
  },

  actions: {
    addDescription() {
      this.model.get('descriptions').createFragment();
    },
    setValidationClass() {
      this.setValidationClass();
    }
  }
});
