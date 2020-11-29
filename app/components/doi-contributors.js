import Component from '@ember/component';

export default Component.extend({
  showContributors: false,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('contributors')) {
      this.model.set('contributors', []);
    }
  },
  actions: {
    addContributor() {
      this.model
        .get('contributors')
        .createFragment({ nameIdentifiers: [], affiliation: [] });
      this.model
        .get('contributors')
        .get('lastObject')
        .get('nameIdentifiers')
        .createFragment();
      this.model
        .get('contributors')
        .get('lastObject')
        .get('affiliation')
        .createFragment();
      this.set('showContributors', true);
    },
    toggleContributors() {
      this.set('showContributors', !this.showContributors);
    }
  }
});
