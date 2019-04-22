import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('creators')) {
      this.model.set('creators', []);
    }
    if (this.model.get('creators').length == 0) {
      this.model.get('creators').createFragment();
    }
  },

  actions: {
    addCreator() {
      this.model.get('creators').createFragment({ nameIdentifiers: [], affiliation: [] });
      this.model.get('creators').get('lastObject').get('nameIdentifiers').createFragment();
      this.model.get('creators').get('lastObject').get('affiliation').createFragment();
    },
    setValidationClass() {
      if (this.model.get('validations.attrs.creators.errors').length > 0) {
        this.set('validationClass', 'has-error');
      } else if (this.model.get('validations.attrs.creators.warnings').length > 0) {
        this.set('validationClass', 'has-warning');
      } else {
        this.set('validationClass', 'has-success');
      }
    }
  }
});