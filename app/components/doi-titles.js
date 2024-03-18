import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  showTitles: true,

  init: function () {
    this._super();

    schedule("afterRender",this,function() {
      if (this.model.get('titles').length == 0) {
        this.send("addTitle");
      }
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('titles')) {
      this.model.set('titles', []);
    }
  },

  actions: {
    addTitle() {
      this.model.get('titles').createFragment();
      this.set('showTitles', true);
    },
    toggleTitles() {
      this.set('showTitles', !this.showTitles);
    }
  }
});
