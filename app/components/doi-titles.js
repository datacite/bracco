import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

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
    setValidationClass() {
      if (this.model.get('validations.attrs.titles.errors').length > 0) {
        this.set('validationClass', 'has-error');
      } else if (this.model.get('validations.attrs.titles.warnings').length > 0) {
        this.set('validationClass', 'has-warning');
      } else {
        this.set('validationClass', 'has-success');
      }
    }
  }
});
