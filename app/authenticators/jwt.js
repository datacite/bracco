import { Promise } from 'rsvp';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
export default OAuth2PasswordGrantAuthenticator.extend({
  authenticate(jwt) {
    return new Promise((resolve) => {
      resolve({
        access_token: jwt,
        token_type: 'bearer'
      });
    });
  }
});
