import Ember from 'ember';
import Cookie from 'ember-cli-js-cookie';
import NodeJsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  isAuthenticated: false,
  isPermitted: false,
  isAdmin: false,
  isProvider: false,
  isClient: false,
  fromCookie: false,
  uid: null,
  jwt: null,
  name: null,
  email: null,
  role_id: null,
  roleName: null,
  provider_id: null,
  client_id: null,
  sandbox_id: null,
  home: null,
  area: 'DOI Fabrica Personal area',
  sandbox: null,

  init() {
    this._super(...arguments);

    if (ENV.JWT_PRIVATE_KEY && ENV.environment === 'test') {
      this.initUser({ uid: ENV.USER_UID, name: ENV.USER_NAME, role_id: ENV.USER_ROLE_ID });
      this.setJwt();
    } else {
      // check for cookie containing jwt
      let jwt = Cookie.get('_datacite_jwt');
      this.set('jwt', jwt);

      // RSA public key
      let cert = ENV.JWT_PUBLIC_KEY ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : null;

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      let self = this;
      NodeJsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (error, payload) {
        if (payload) {
          self.set('fromCookie', true);
          self.initUser(payload);
        } else if (error.message !== "jwt must be provided") {
          Ember.Logger.assert(false, error);
        }
      });
    }
  },

  initUser(payload) {
    if (Ember.isPresent(payload)) {
      this.set('isAuthenticated', true);
      this.set('uid', payload.uid);
      this.set('name', payload.name);
      this.set('email', payload.email);
      this.set('provider_id', payload.provider_id);
      this.set('client_id', payload.client_id);

      this.setRole(payload.role_id);

      if (payload.sandbox_id) {
        this.set('sandbox_id', payload.sandbox_id);
        this.set('sandbox', '/clients/' + payload.sandbox_id);
      }
    }
  },

  setRole(role_id) {
    this.set('role_id', role_id);
    this.set('roleName', role_id.split('_').map(item => item.capitalize()).join(' '));

    if (['staff_admin', 'staff_user'].includes(role_id)) {
      this.set('isAdmin', true);
      this.set('home', '/');
      this.set('area', 'DataCite Administration area')
    } else if (['provider_admin', 'provider_user'].includes(role_id) && this.get('provider_id')) {
      this.set('isProvider', true);
      this.set('home', '/providers/' + this.get('provider_id'));
      this.set('area', 'Provider Administration area')
    } else if (['client_admin', 'client_user'].includes(role_id) && this.get('client_id')) {
      this.set('isClient', true);
      this.set('home', '/clients/' + this.get('client_id'));
      this.set('area', 'Client Administration area')
    } else {
      this.set('role_id', 'user');
      this.set('role_name', 'User');
      this.set('home', '/users/' + this.get('uid'));
    }

    this.get('flashMessages').info('Welcome ' + this.get('name') + ' to the ' + this.get('area') + '.');
  },

  setJwt() {
    let duration = (ENV.environment === 'test') ? 60 : (30 * 24 * 3600)
    let payload = {
      uid: this.get('uid'),
      name: this.get('name'),
      role_id: this.get('role_id'),
      exp: Math.floor(Date.now() / 1000) + duration
    };

    // RSA private key
    let cert = ENV.JWT_PRIVATE_KEY ? ENV.JWT_PRIVATE_KEY.replace(/\\n/g, '\n') : null;

    // sign asymmetric token, using RSA with SHA-256 hash algorithm
    NodeJsonWebToken.sign(payload, cert, { algorithm: 'RS256' }, function (error, jwt) {
      if (jwt) {
        self.set('jwt', jwt);
      } else {
        Ember.Logger.assert(false, error);
      }
    });
  }
});
