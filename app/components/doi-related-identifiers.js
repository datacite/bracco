import Component from '@ember/component';

export default Component.extend({
  // validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('relatedIdentifiers')) {
      this.model.set('relatedIdentifiers', []);
    }
  },
  actions: {
    addRelatedIdentifier() {
      this.model.get('relatedIdentifiers').createFragment();
    },
  },
});