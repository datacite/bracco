import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  showCreators: true,

  init: function () {
    this._super();

    schedule("afterRender",this,function() {
      if (this.model.get('creators').length == 0) {
        this.send("addCreator");
      }
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('creators')) {
      this.model.set('creators', []);
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
