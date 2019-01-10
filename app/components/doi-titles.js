import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    if (isPresent(this.model.get('titles'))) {
      var titles = this.model.get('titles');
      if (typeof (titles) === 'string') {
        this.model.set('titles', titles);
      } else {
        this.model.set('titles', titles[0].title);
      }
    }
  }
});
