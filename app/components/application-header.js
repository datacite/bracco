import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  default: false,
  type: 'transparent',
  title: null,
  home: '/',

  didInsertElement: function() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }
    this.set('home', this.get('currentUser').get('home'));
  }
});
