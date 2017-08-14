import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import JsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  isAuthenticated: false,
  isPermitted: false,
  isAdmin: false,
  isMember: false,
  isDataCenter: false,
  uid: null,
  jwt: null,
  name: null,
  email: null,
  role: null,
  member_id: null,
  datacenter_id: null,

  init() {
    this._super(...arguments);

    let self = this;
    let decoded = new Ember.RSVP.Promise(function(resolve) {
      // check for cookie containing jwt
      let jwt = Cookie.get('_datacite_jwt');
      if (Ember.isNone(jwt)) resolve(null);

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      let cert = ENV.JWT_PUBLIC_KEY ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : null;
      JsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (err, payload) {
        payload.jwt = jwt;
        resolve(payload);
      });
    });

    decoded.then(function(result) {
      self.set('isAuthenticated', Ember.isPresent(result));

      if (Ember.isPresent(result)) {
        self.set('jwt', result.jwt);
        self.set('uid', result.uid);
        self.set('name', result.name);
        self.set('email', result.email);
        self.set('role', result.role);
        self.set('member_id', result.member_id);
        self.set('datacenter_id', result.datacenter_id);
        self.set('isAdmin', Ember.isEqual(result.role, "staff_admin"));
        self.set('isMember', Ember.isEqual(result.role, "member_admin"));
        self.set('isDataCenter', Ember.isEqual(result.role, "datacenter_admin"));
      }
    });
  }
});
