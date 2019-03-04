import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  hasErrors: false,

  actions: {
    addCreator() {
      this.model.get('creators').createFragment();
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    }
  }
});