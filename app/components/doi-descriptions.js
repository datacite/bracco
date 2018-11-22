import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didInsertElement() {
    let description = '';
    if (isPresent(this.get('model').get('descriptions'))) {
      description = this.get('model').get('descriptions')[0].description;
    }
    this.get('model').set('description', description);
  }
});
