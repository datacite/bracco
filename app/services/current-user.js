import { resolve } from 'rsvp';
import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import KJUR, { b64utoutf8 } from 'jsrsasign';
import ENV from 'bracco/config/environment';

export default Service.extend({
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
  isConsortium: false,
  isProvider: false,
  isClient: false,
  isUser: false,
  isBetaTester: false,

  load() {
    if (this.get('session.data.authenticated.access_token')) {
      // using authenticator:oauth2
      let jwt = this.get('session.data.authenticated.access_token');

      // rejecting revoked tokens
      if (ENV.JWT_BLACKLISTED.split(',').includes(jwt)) {
        jwt = null;
        this.flashMessages.danger(
          'Unable to authenticate because the token has been revoked.'
        );
      }
      // RSA public key
      let cert = ENV.JWT_PUBLIC_KEY
        ? ENV.JWT_PUBLIC_KEY.replace(/\\n/g, '\n')
        : null;

      // verify asymmetric token, using RSA with SHA-256 hash algorithm
      let isValid = KJUR.jws.JWS.verify(jwt, cert, ['RS256']);
      let payload = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(jwt.split('.')[1])
      );
      if (isValid && payload) {
        this.set('jwt', jwt);
        this.initUser(payload);
      }
    } else if (this.get('session.data.authenticated.role_id')) {
      // using authenticator:test
      this.initUser(this.get('session.data.authenticated'));
    }
    return resolve();
  },

  initUser(payload) {
    if (!isEmpty(payload) && !isEmpty(payload.uid)) {
      this.set('uid', payload.uid);
      this.set('name', payload.name);
      this.set('email', payload.email);
      this.set('provider_id', payload.provider_id);
      this.set('client_id', payload.client_id);
      this.set('role_id', payload.role_id);
      this.set('isBetaTester', payload.beta_tester);

      if (payload.role_id === 'staff_admin') {
        this.set('isAdmin', true);
        this.set('home', { route: 'providers' });
        this.set('settings', { route: 'index' });
        this.set('roleName', 'Staff');

        this.features.setup({
          'show-researchers': true
        });
      } else if (payload.role_id === 'consortium_admin') {
        this.set('isConsortium', true);
        this.set('home', { route: 'providers.show', id: this.uid });
        this.set('settings', { route: 'providers.show', id: this.uid });
        this.set('roleName', 'Consortium');
      } else if (payload.role_id === 'provider_admin') {
        this.set('isProvider', true);
        this.set('home', { route: 'providers.show', id: this.uid });
        this.set('settings', { route: 'providers.show', id: this.uid });
        this.set('roleName', 'Member');
      } else if (payload.role_id === 'client_admin') {
        this.set('isClient', true);
        this.set('home', { route: 'repositories.show', id: this.uid });
        this.set('settings', { route: 'repositories.show', id: this.uid });
        this.set('roleName', 'Repository');
      } else if (payload.role_id === 'user') {
        this.set('home', { route: 'users.show', id: this.uid });
        this.set('settings', { route: 'users.show', id: this.uid });
        this.set('roleName', 'User');
      } else if (payload.role_id === 'temporary') {
        this.set('home', { route: 'password' });
      }

      if (payload.uid.startsWith('0')) {
        this.set('isUser', true);
        this.set('home', { route: 'users.show', id: this.uid });
      }

      if (payload.beta_tester) {
        this.features.setup({
          'show-researchers': true
        });
      }

      // if (![ 'user', 'temporary' ].includes(payload.role_id)) {
      //   this.flashMessages.info('Welcome ' + this.name + ' to the Fabrica administration area.');
      // }
    }
  }
});
