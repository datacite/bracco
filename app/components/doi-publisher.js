import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model.get('publisher')) {
      this.model.set('publisher', this.store.createFragment('publisher'));
    }
  }
});
