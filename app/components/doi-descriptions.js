import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.get('model').get('descriptions'))) {
      this.get('model').set('descriptions', this.get('model').get('descriptions')[0].description);
    }
  }
});
