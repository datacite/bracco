import Component from '@ember/component';
import { ianaNameFromTemplate } from '../utils/iana-name-from-template';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('item', ianaNameFromTemplate(this.get('attrs.option')));
  },
});
