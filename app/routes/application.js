import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'bracco/config/environment';
import { set } from '@ember/object';

export default class ApplicationRoute extends Route {
  @service
  session;

  @service
  currentUser;

  @service
  headData;

  @service
  intl;

  @service
  router;

  isTokenAuthenticating = null;

  async beforeModel() {
    await this.session.setup();
    this.intl.setLocale(['en-us']);
    set(this, 'headData.siteName', ENV.SITE_TITLE);
    return this._loadCurrentUser();
  }

  model(params) {
    const { jwt } = params;
    if (jwt) {
      this.set('isTokenAuthenticating', true);
      if (this.get('session.isAuthenticated')) {
        this.session.invalidate();
      }
      let self = this;
      this.session.authenticate('authenticator:jwt', jwt).then(function () {
        return self._loadCurrentUser();
      });
    }
  }

  sessionAuthenticated() {
    if (!this.isTokenAuthenticating) {
      undefined;
      this._loadCurrentUser();
      this.router.transitionTo('providers');
    } else {
      this.set('isTokenAuthenticating', false);
    }
  }

  sessionInvalidated() {
    if (!this.isTokenAuthenticating) {
      undefined;
    }
  }

  _loadCurrentUser() {
    return this.currentUser.load().catch(() => this.session.invalidate());
  }
}
