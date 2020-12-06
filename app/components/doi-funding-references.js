import Component from '@ember/component';

export default Component.extend({
  showFundingReferences: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.fundingReferences) {
      this.model.set('fundingReferences', []);
    }
  },

  actions: {
    addFundingReference() {
      this.model.fundingReferences.createFragment();
      this.set('showFundingReferences', true);
    },
    toggleFundingReferences() {
      this.set('showFundingReferences', !this.showFundingReferences);
    }
  }
});
