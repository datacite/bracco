import Component from '@ember/component';

export default Component.extend({
  showCreators: true,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.creators) {
      this.model.set('creators', []);
    }
    if (this.model.creators.length == 0) {
      this.model.creators.createFragment();
    }
  },

  actions: {
    addCreator() {
      this.model.creators.createFragment({
        nameIdentifiers: [],
        affiliation: []
      });
      this.model.creators.lastObject.nameIdentifiers.createFragment();
      this.model.creators.lastObject.affiliation.createFragment();
      this.set('showCreators', true);
    },
    toggleCreators() {
      this.set('showCreators', !this.showCreators);
    }
  }
});
