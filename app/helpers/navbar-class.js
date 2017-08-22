import Ember from 'ember';

export default Ember.Helper.extend({
  currentUser: Ember.inject.service(),

  compute(params) {
    let notAuthenticated = !this.get('currentUser').get('isAuthenticated');
    if (notAuthenticated && params[0] === "index") {
      return "navbar-transparent";
    } else {
      return "navbar-default";
    }
  }
});
