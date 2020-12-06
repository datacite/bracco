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
      if (this.session.isAuthenticated) {
        this.session.invalidate();
      }
      let self = this;
      this.session.authenticate('authenticator:jwt', jwt).then(function () {
        return self._loadCurrentUser();
      });
    }
  },
  afterModel() {
    set(this, 'headData.title', ENV.SITE_TITLE || 'DataCite Fabrica');
    set(this, 'headData.dataDomain', ENV.DATA_DOMAIN);
    set(
      this,
      'headData.contentUrl',
      (ENV.CDN_URL || 'https://datacite.org') +
        '/stylesheets/doi.css?version=1.0'
    );
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
