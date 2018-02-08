import Ember from 'ember';
const { inject: { service }, isEmpty } = Ember;
import NodeJsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  session: service(),
  store: service(),
  flashMessages: service(),
  features: service(),

  uid: null,
  jwt: null,
  name: null,
  email: null,
  role_id: null,
  roleName: null,
  provider_id: null,
  client_id: null,
  home: null,
  settings: null,
  isAdmin: false,
  isProvider: false,
  isClient: false,

  load() {
    let jwt = this.get('session.data.authenticated.access_token');
    if (!isEmpty(jwt)) {
      // RSA public key
      let cert = ENV.JWT_PUBLIC_KEY ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n') : null;

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      let self = this;
      NodeJsonWebToken.verify(jwt, cert, { algorithms: ['RS256'] }, function (error, payload) {
        if (payload) {
          self.set('jwt', jwt);
          self.initUser(payload);
        } else if (error.message !== "jwt must be provided") {
          Ember.Logger.assert(false, error);
        }
      });
    }
    return Ember.RSVP.resolve();
  },

  initUser(payload) {
    if (!isEmpty(payload) && !isEmpty(payload.uid)) {
      this.set('uid', payload.uid);
      this.set('name', payload.name);
      this.set('email', payload.email);
      this.set('provider_id', payload.provider_id);
      this.set('client_id', payload.client_id);
      this.set('role_id', payload.role_id);
      this.set('roleName', payload.role_id.split('_')[0].capitalize());

      if (payload.role_id === 'staff_admin') {
        this.set('isAdmin', true);
        this.set('home', { route: 'index' });
        this.set('settings', { route: 'settings' });
      } else if (payload.role_id === 'provider_admin') {
        this.set('isProvider', true);
        this.set('home', { route: 'providers.show', id: this.get('uid') });
        this.set('settings', { route: 'providers.show.settings', id: this.get('uid') });
      } else if (payload.role_id === 'client_admin') {
        this.set('isClient', true);
        this.set('home', { route: 'clients.show', id: this.get('uid') });
        this.set('settings', { route: 'clients.show.settings', id: this.get('uid') });
      } else if (payload.role_id === 'user') {
        this.set('home', 'password');
      }

      if (payload.role_id !== 'user') {
        this.get('flashMessages').info('Welcome ' + this.get('name') + ' to the DOI Fabrica administration area.');
      }

      // setup features for ember-feature-flags
      // this.get('features').setup(payload.features);
    }
  }
});
