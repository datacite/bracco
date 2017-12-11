import Ember from 'ember';

export default Ember.Helper.extend({
  compute(params, hash) {
    let role_id = hash.role_id === undefined ? null : hash.role_id;
    let inverse = hash.inverse === undefined ? false : true;

    if (role_id) {
      if (inverse) {
        return this.get('currentUser').get('role_id') !== role_id;
      } else {
        return this.get('currentUser').get('role_id') === role_id;
      }
    } else {
      return this.get('currentUser');
    }
  }
});
