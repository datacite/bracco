import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  showFormats: false,

  init: function () {
    this._super();

    schedule("afterRender",this,function() {
      if (!this.model.get('formats')) {
        this.model.set('formats', []);
      }
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

  },
  actions: {
    addFormat() {
      this.model.get('formats').push('');
      this.model.set('formats', Array.from(this.model.get('formats')));
      this.set('showFormats', true);
    },
    toggleFormats() {
      this.set('showFormats', !this.showFormats);
    }
  }
});
