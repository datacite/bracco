import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.model.get('titles'))) {
      this.model.set('titles', this.model.get('titles')[0].title);
    }
  }
});
