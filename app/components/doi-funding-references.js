import Component from '@ember/component';

export default Component.extend({
  validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('fundingReferences')) {
      this.model.set('fundingReferences', []);
    }
    if (this.model.get('fundingReferences').length == 0) {
      this.model.get('fundingReferences').createFragment();
    }
  },

  actions: {
    addFundingReference() {
      this.model.get('fundingReferences').createFragment();
    },
  },
});
