import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),
  intl: service(),

  isTokenAuthenticating: null,

  beforeModel() {
    this.intl.setLocale(['en-us']);

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
      this.session.authenticate('authenticator:jwt', jwt).then(function() {
        return self._loadCurrentUser();
      });
    }
  },

  sessionAuthenticated() {
    if (!this.isTokenAuthenticating) {
      this._super(...arguments);
      this._loadCurrentUser();
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
