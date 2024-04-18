import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('url', this.url);
  }
});
