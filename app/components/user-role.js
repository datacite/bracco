import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),

  init(...args) {
    this._super(...args);
  },

  didReceiveAttrs() {
    this._super(...arguments);
  }
});
