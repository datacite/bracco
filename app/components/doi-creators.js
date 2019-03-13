import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  hasErrors: false,

  actions: {
    addCreator() {
      this.model.get('creators').createFragment({ nameIdentifiers: [] });
      this.model.get('creators').get('lastObject').get('nameIdentifiers').createFragment();
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    }
  }
});