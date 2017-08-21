import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Helper.extend({
  currentUser: Ember.inject.service(),

  compute(params) {
    let notAuthenticated = !this.get('currentUser').get('isAuthenticated');
    if (notAuthenticated && params[0] === "index") {
      return null;
    } else {
      return ENV.SITE_TITLE;
    }
  }
});
