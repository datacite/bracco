import classic from 'ember-classic-decorator';
import { Promise } from 'rsvp';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';

@classic
export default class Jwt extends OAuth2PasswordGrantAuthenticator {
  authenticate(jwt) {
    return new Promise((resolve) => {
      resolve({
        access_token: jwt,
        token_type: 'bearer'
      });
    });
  }
}
