import Component from '@ember/component';

export default Component.extend({
  isValidating: false,
  hasErrors: false,

  didReceiveAttrs() {
    this._super(...arguments);

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
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    }
  }
});