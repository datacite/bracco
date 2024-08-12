import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';

@classic
export default class ApplicationHeader extends Component {
  @service
  session;

  @service
  currentUser;

  @service
  features;

  @service
  router;

  default = false;
  type = 'transparent';
  title = null;
  home = '/';
  user = true;
  showLogo = true;
  navBgColor = '';
  navButtonColor = '';

  init(...args) {
    super.init(...args);

    if (ENV.featureFlags['enable-doi-estimate']) {
      this.features.enable('enableDoiEstimate');
    } else {
      this.features.disable('enableDoiEstimate');
    }

    this.data = this.data || {};
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (this.default) {
      this.set('type', null);
      this.set('title', htmlSafe(ENV.SITE_TITLE));
    } else if (this['sign-in']) {
      this.set('title', htmlSafe(ENV.SITE_TITLE));
      this.set('user', false);
    }

    let home = this.currentUser.get('home');
    if (typeOf(home) == 'object') {
      this.set('home', { route: home.route, model: home.id });
    } else if (home === 'password') {
      this.set('home', null);
    } else if (home) {
      this.set('home', { href: home });
    } else {
      this.set('home', null);
    }

    let settings = this.currentUser.get('settings');
    if (typeOf(settings) == 'object') {
      this.set('settings', { route: settings.route, model: settings.id });
    } else if (home === 'password') {
      this.set('settings', null);
    } else if (home) {
      this.set('settings', { href: settings });
    } else {
      this.set('settings', null);
    }

    let route = this.router.currentRouteName;

    if ((!this.session.isAuthenticated && route === 'index') || route === 'sign-in' || route === 'password' || route === 'reset' || route === '404') {
      this.showLogo = false;
    }

    let role = this.currentUser.get('roleName');
    if (role === 'Member') {
      this.set('navBgColor', 'navbar-member');
      this.set('navButtonColor', 'navbar-button-member');
    } else if (role === 'Consortium') {
      this.set('navBgColor', 'navbar-consortium');
      this.set('navButtonColor', 'navbar-button-consortium');
    }
  }

  @action
  transitionNoAccess() {
    this.router.transitionTo(this.home);
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
