import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let title = '';
    if (isPresent(this.get('model').get('titles'))) {
      title = this.get('model').get('titles')[0].title;
    }
    this.get('model').set('title', title);
  }
});
