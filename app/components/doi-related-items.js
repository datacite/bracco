import Component from '@ember/component';

export default Component.extend({
  showRelatedItems: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('relatedItems')) {
      this.model.set('relatedItems', []);
    }
  },
  actions: {
    addRelatedItem() {
      this.model.get('relatedItems').createFragment();
      this.set('showRelatedItems', true);
    },
    toggleRelatedItems() {
      this.set('showRelatedItems', !this.get('showRelatedItems'));
    },
  },
});