import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'bracco/config/environment';
import { set } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),
  headData: service(),
  intl: service(),

  isTokenAuthenticating: null,

  beforeModel() {
    this.intl.setLocale(['en-us']);
    set(this, 'headData.siteName', ENV.SITE_TITLE);
    return this._loadCurrentUser();
  },
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
  },
  sessionAuthenticated() {
    if (!this.isTokenAuthenticating) {
      this._super(...arguments);
      this._loadCurrentUser();
      this.transitionTo('providers');
    } else {
      this.set('isTokenAuthenticating', false);
    }
  },
  sessionInvalidated() {
    if (!this.isTokenAuthenticating) {
      this._super();
    }
  },
  _loadCurrentUser() {
    return this.currentUser.load().catch(() => this.session.invalidate());
  }
});
