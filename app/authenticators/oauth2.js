import classic from 'ember-classic-decorator';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'bracco/config/environment';

@classic
export default class Oauth2 extends OAuth2PasswordGrantAuthenticator {
  serverTokenEndpoint = ENV.API_URL + '/token';
  sendClientIdAsQueryParam = true;
}
