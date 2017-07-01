import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import JsonWebToken from 'npm:jsonwebtoken';
import ENV from 'lagotto-admin/config/environment';

export default Ember.Service.extend({
  isAuthenticated: false,
  isAdmin: false,
  uid: null,
  name: null,
  email: null,
  role: null,

  init() {
    this._super(...arguments);

    let self = this;
    let decoded = new Ember.RSVP.Promise(function(resolve) {
      // check for cookie containing jwt
      let jwt = Cookie.get('_datacite_jwt');
      if (Ember.isNone(jwt)) resolve(null);

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      let cert = (ENV.JWT_PUBLIC_KEY).replace(/\\n/g, '\n');
      JsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (err, payload) {
        resolve(payload);
      });
    });

    decoded.then(function(result) {
      self.set('isAuthenticated', Ember.isPresent(result));

      if (Ember.isPresent(result)) {
        self.set('uid', result.uid);
        self.set('name', result.name);
        self.set('email', result.email);
        self.set('role', result.role);
        self.set('isAdmin', result.role === "admin");
      }
    });
  }
});
