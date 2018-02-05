import Ember from 'ember';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),
  intl: service(),

  isTokenAuthenticating: null,

  beforeModel() {
    // if you lazily load translations, here is also where you would load them via `intl.addTranslations`
    this.get('intl').setLocale(['en-us']);

    return this._loadCurrentUser();
  },

  model(params) {
    const { jwt } = params;
    if (jwt) {
      this.set('isTokenAuthenticating', true);
      if (this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
      }
      let self = this;
      this.get('session').authenticate('authenticator:jwt', jwt).then(function() {
        return self._loadCurrentUser();
      });
    }
  },

  sessionAuthenticated() {
    if (!this.get('isTokenAuthenticating')) {
      this._super(...arguments);
      this._loadCurrentUser();
    } else {
      this.set('isTokenAuthenticating', false);
    }
  },

  sessionInvalidated() {
    if (!this.get('isTokenAuthenticating')) {
      this._super();
    }
  },

  _loadCurrentUser() {
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  }
});
