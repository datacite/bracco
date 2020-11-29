import Component from '@ember/component';

export default Component.extend({
  showCreators: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('creators')) {
      this.model.set('creators', []);
    }
    if (this.model.get('creators').length == 0) {
      this.model.get('creators').createFragment();
    }
  },

  actions: {
    addCreator() {
      this.model
        .get('creators')
        .createFragment({ nameIdentifiers: [], affiliation: [] });
      this.model
        .get('creators')
        .get('lastObject')
        .get('nameIdentifiers')
        .createFragment();
      this.model
        .get('creators')
        .get('lastObject')
        .get('affiliation')
        .createFragment();
      this.set('showCreators', true);
    },
    toggleCreators() {
      this.set('showCreators', !this.showCreators);
    }
  }
});
