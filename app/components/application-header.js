import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  default: false,
  type: 'transparent',
  title: null,
  home: '/',

  // init: function () {
  //   this._super();
  //
  //   if (!this.get('default')) {
  //     Ember.run.schedule("afterRender",this,function() {
  //       this.send("transitionNoAccess");
  //     });
  //   }
  // },

  actions: {
    transitionNoAccess() {
      this.get('router').transitionTo(this.get('home'));
    }
  },

  didInsertElement: function() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }
    this.set('home', this.get('currentUser').get('home'));
  }
});
