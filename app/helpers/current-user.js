import Ember from 'ember';

export default Ember.Helper.extend({
  currentUser: Ember.inject.service(),

  compute(params, hash) {
    let role = hash.role === undefined ? null : hash.role;
    let inverse = hash.inverse === undefined ? false : true;

    if (role) {
      if (inverse) {
        return this.get('currentUser').get('role') !== role;
      } else {
        return this.get('currentUser').get('role') === role;
      }
    } else {
      return this.get('currentUser');
    }
  }
});
