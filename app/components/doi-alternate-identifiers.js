import Component from '@ember/component';

export default Component.extend({
  // validationClass: null,
  showAlternateIdentifiers: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('identifiers')) {
      this.model.set('identifiers', []);
    }
  },

  actions: {
    addIdentifier() {
      this.model.get('identifiers').createFragment();
      this.set('showAlternateIdentifiers', true);
    },
    toggleAlternateIdentifiers() {
      this.set('showAlternateIdentifiers', !this.get('showAlternateIdentifiers'));
    },
  },
});
