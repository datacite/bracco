import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.model.get('titles').length == 0) {
      this.model.get('titles').createFragment();
    }

    this.setValidationClass(false);
  },

  setValidationClass(success) {
    if (this.model.get('validations.attrs.titles.errors').length > 0) {
      this.set('validationClass', 'has-error');
    } else if (this.model.get('validations.attrs.titles.warnings').length > 0) {
      this.set('validationClass', 'has-warning');
    } else if (success) {
      this.set('validationClass', 'has-success');
    } else {
      this.set('validationClass', null);
    }
  },

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    },
    setValidationClass() {
      this.setValidationClass(true);
    },
  },
});
