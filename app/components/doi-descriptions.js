import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.model.get('descriptions')) && this.model.get('descriptions').constructor === Array) {
      this.model.set('descriptions', this.model.get('descriptions')[0].description);
    }
  }
});
