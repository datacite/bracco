import Component from '@ember/component';

export default Component.extend({
  // validationClass: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('contributors')) {
      this.model.set('contributors', []);
    }
    if (this.model.get('contributors').length == 0) {
      this.model.get('contributors').createFragment();
    }
  },
  actions: {
    addContributor() {
      this.model.get('contributors').createFragment({ nameIdentifiers: [], affiliation: [] });
      this.model.get('contributors').get('lastObject').get('nameIdentifiers').createFragment();
      this.model.get('contributors').get('lastObject').get('affiliation').createFragment();
    },
  },
});