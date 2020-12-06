import Component from '@ember/component';

export default Component.extend({
  showRelatedIdentifiers: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.relatedIdentifiers) {
      this.model.set('relatedIdentifiers', []);
    }
  },
  actions: {
    addRelatedIdentifier() {
      this.model.relatedIdentifiers.createFragment();
      this.set('showRelatedIdentifiers', true);
    },
    toggleRelatedIdentifiers() {
      this.set('showRelatedIdentifiers', !this.showRelatedIdentifiers);
    }
  }
});
