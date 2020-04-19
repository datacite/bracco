import Component from '@ember/component';

export default Component.extend({
  // validationClass: null,
  showCreators: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('creators')) {
      this.model.set('creators', []);
    }
    if (this.model.get('creators').length == 0) {
      this.model.get('creators').createFragment();
    }

    // this.setValidationClass(false);
  },

  // setValidationClass(success) {
  //   // these errors and warnings are not included in global errors, as they are nested two levels
  //   let nameIdentifiersErrors = this.model.get('creators').filter(function(creator) {
  //     return creator.get('validations.attrs.nameIdentifiers.errors').length > 0;
  //   });
  //   let nameIdentifiersWarnings = this.model.get('creators').filter(function(creator) {
  //     return creator.get('validations.attrs.nameIdentifiers.warnings').length > 0;
  //   });

  //   if (this.model.get('validations.attrs.creators.errors').length > 0 || nameIdentifiersErrors.length > 0) {
  //     this.set('validationClass', 'has-error');
  //   } else if (this.model.get('validations.attrs.creators.warnings').length > 0 || nameIdentifiersWarnings.length > 0) {
  //     this.set('validationClass', 'has-warning');
  //   } else if (success) {
  //     this.set('validationClass', 'has-success');
  //   } else {
  //     this.set('validationClass', '');
  //   }
  // },

  actions: {
    addCreator() {
      this.model.get('creators').createFragment({ nameIdentifiers: [], affiliation: [] });
      this.model.get('creators').get('lastObject').get('nameIdentifiers').createFragment();
      this.model.get('creators').get('lastObject').get('affiliation').createFragment();
      this.set('showCreators', true);
    },
    toggleCreators() {
      this.set('showCreators', !this.get('showCreators'));
    },
    // setValidationClass() {
    //   this.setValidationClass(true);
    // },
  },
});