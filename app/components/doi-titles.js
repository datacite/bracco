import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  errorMessage: false,

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setErrorMessage(value) {
      this.set('errorMessage', value);
    }
  }
});
