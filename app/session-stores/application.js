import CookieStore from 'ember-simple-auth/session-stores/cookie';
import ENV from 'bracco/config/environment';

export default CookieStore.extend({
  cookieName: '_datacite',
  cookieDomain: ENV.COOKIE_DOMAIN
});
