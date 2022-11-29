import Component from '@ember/component';

export default Component.extend({
  showAlternateIdentifiers: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('alternateIdentifiers')) {
      this.model.set('alternateIdentifiers', []);
    }
  },

  actions: {
    addAlternateIdentifier() {
      this.model.get('alternateIdentifiers').createFragment();
      this.set('showAlternateIdentifiers', true);
    },
    toggleAlternateIdentifiers() {
      this.set('showAlternateIdentifiers', !this.showAlternateIdentifiers);
    },
  },
});
