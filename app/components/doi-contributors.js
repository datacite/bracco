import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  showContributors: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.contributors) {
      this.model.set('contributors', []);
    }
  },
  actions: {
    addContributor() {
      this.model.contributors.createFragment({
        nameIdentifiers: [],
        affiliation: []
      });
      this.model.contributors.lastObject.nameIdentifiers.createFragment();
      this.model.contributors.lastObject.affiliation.createFragment();
      this.set('showContributors', true);
    },
    toggleContributors() {
      this.set('showContributors', !this.showContributors);
    }
  }
});
