import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import JsonWebToken from 'npm:jsonwebtoken';
import ENV from 'lagotto-admin/config/environment';

export default Ember.Service.extend({
  currentUser: null,

  init() {
    this._super(...arguments);
    return Ember.RSVP.Promise(function(resolve) {
      // verify asymmetric token, RSA with SHA-256 hash algorithm
      let jwt = Cookie.get('_datacite_jwt');
      var cert = ENV.JWT_PUBLIC_KEY;
      JsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (err, payload) {
        if (err) {
          // console.log(err)
        } else {
          this.set('currentUser', payload);
          resolve(payload);
        }
      });
    });
  },

  get() {
    return this.get('currentUser');
  },

  isAuthenticated() {
    if (this.get('currentUser')) {
      return true;
    } else {
      return false;
    }
  }
});
