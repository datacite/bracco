import Component from '@ember/component';
import ENV from 'bracco/config/environment';

export default Component.extend({
  tagName: 'li',

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('navmenuTitle', ENV.NAVMENU_TITLE);
  },
});
