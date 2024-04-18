import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  showSizes: false,

  init: function () {
    this._super();

    schedule("afterRender",this,function() {
      if (!this.model.get('sizes')) {
        this.model.set('sizes', []);
      }
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);
  },
  actions: {
    addSize() {
      this.model.get('sizes').push('');
      this.model.set('sizes', Array.from(this.model.get('sizes')));
      this.set('showSizes', true);
    },
    toggleSizes() {
      this.set('showSizes', !this.showSizes);
    }
  }
});
