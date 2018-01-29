import Ember from 'ember';
const { inject: { service }, isEmpty } = Ember;
import NodeJsonWebToken from 'npm:jsonwebtoken';
import ENV from 'bracco/config/environment';

export default Ember.Service.extend({
  session: service('session'),
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
  sandbox: null,

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
      return Ember.RSVP.resolve();
      // return this.get('store').findRecord('user', 1).then((user) => {
      //   this.set('user', user);
      // });
    } else {
      return Ember.RSVP.resolve();
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

      // setup features for ember-feature-flags
      this.get('features').setup(payload.features);

      if (payload.sandbox_id) {
        this.set('sandbox_id', payload.sandbox_id);
        this.set('sandbox', { route: 'clients.show', id: payload.sandbox_id });
      }
    }
  },

  setRole(role_id) {
    this.set('role_id', role_id);
    this.set('roleName', role_id.split('_')[0].capitalize());

    if (['staff_admin'].includes(role_id)) {
      this.set('isAdmin', true);
      this.set('home', { route: 'index' });
      this.set('settings', { route: 'settings' });
      this.set('area', 'DataCite Administration area')
    } else if (['provider_admin'].includes(role_id) && this.get('provider_id')) {
      this.set('isProvider', true);
      this.set('home', { route: 'providers.show', id: this.get('provider_id') });
      this.set('settings', { route: 'providers.show.settings', id: this.get('provider_id') });
      this.set('area', 'Provider Administration area')
    } else if (['client_admin'].includes(role_id) && this.get('client_id')) {
      this.set('isClient', true);
      this.set('home', { route: 'clients.show', id: this.get('client_id') });
      this.set('settings', { route: 'clients.show.settings', id: this.get('client_id') });
      this.set('area', 'Client Administration area')
    }

    this.get('flashMessages').info('Welcome ' + this.get('name') + ' to the ' + this.get('area') + '.');
  }
});
