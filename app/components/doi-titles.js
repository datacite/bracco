import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  hasErrors: false,

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    }
  }
});
