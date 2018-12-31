import Component from '@ember/component';
import ENV from 'bracco/config/environment';

export default Component.extend({
  tagName: 'li',

  didInsertElement() {
    this.set('navmenuTitle', ENV.NAVMENU_TITLE);
  }
});
