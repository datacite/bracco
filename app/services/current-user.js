import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import JsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  flashMessages: Ember.inject.service(),

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
  data_center_id: null,
  home: null,

  init() {
    this._super(...arguments);

    let self = this;
    let decoded = new Ember.RSVP.Promise(function(resolve, reject) {
      // check for cookie containing jwt
      let jwt = Cookie.get('_datacite_jwt');

      // check for RSA public key
      let cert = ENV.JWT_PUBLIC_KEY ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : null;

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      JsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (error, payload) {
        if (payload) {
          // add JWT to returned payload
          payload.jwt = jwt;
          resolve(payload);
        } else {
          reject(error);
        }
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
        self.set('data_center_id', result.datacenter_id);

        if (result.member_id) {
          self.set('home', '/members/' + result.member_id);
        } else if (result.data_center_id) {
          self.set('home', '/data-centers/' + result.data_center_id);
        } else {
          self.set('home', '/');
        }

        self.set('isAdmin', Ember.isEqual(result.role, "staff_admin"));
        self.set('isMember', Ember.isEqual(result.role, "member_admin"));
        self.set('isDataCenter', Ember.isEqual(result.role, "data_center_admin"));

        if (result.role === "data_center_admin") {
          self.get('flashMessages').info('Welcome ' + result.name + ' to the Client Administration area.');
        } else if (result.role === "member_admin") {
          self.get('flashMessages').info('Welcome ' + result.name + ' to the DOI Registration Provider Administration area.');
        } else if (result.role === "staff_admin") {
          self.get('flashMessages').info('Welcome ' + result.name + ' to the DataCite Administration area.');
        }
      }
    }, function(reason) {
      Ember.Logger.assert(false, reason)
    });
  }
});
