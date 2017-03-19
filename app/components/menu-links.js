import Ember from 'ember';
import ENV from 'lagotto-admin/config/environment';

export default Ember.Component.extend({
  didInsertElement: function() {
    this.set('navmenuTitle', ENV.NAVMENU_TITLE);          
  }
});
