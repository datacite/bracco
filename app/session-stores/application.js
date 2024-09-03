import classic from 'ember-classic-decorator';
import CookieStore from 'ember-simple-auth/session-stores/cookie';

@classic
export default class Application extends CookieStore {
  cookieName = '_fabrica';
  sameSite = 'Lax';
}
