import Component from '@ember/component';

export default Component.extend({
  // validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('relatedIdentifiers')) {
      this.model.set('relatedIdentifiers', []);
    }
    if (this.model.get('relatedIdentifiers').length == 0) {
      this.model.get('relatedIdentifiers').createFragment();
    }
  },
  actions: {
    addRelatedIdentifier() {
      this.model.get('relatedIdentifiers').createFragment();
    },
  },
});