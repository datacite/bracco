import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.get('model').get('titles'))) {
      this.get('model').set('titles', this.get('model').get('titles')[0].title);
    }
  }
});
