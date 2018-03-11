import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    this.set('navmenuTitle', ENV.NAVMENU_TITLE);
  }
});
