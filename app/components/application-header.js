// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import { tracked } from '@glimmer/tracking';

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

  constructor(...args) {
    super(...args);

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
      this.type = null;
      this.title = htmlSafe(ENV.SITE_TITLE);
    } else if (this['sign-in']) {
      this.title = htmlSafe(ENV.SITE_TITLE);
      this.user = false;
    }

    let home = this.currentUser.home;
    if (typeOf(home) == 'object') {
      this.home = { route: home.route, model: home.id };
    } else if (home === 'password') {
      this.home = null;
    } else if (home) {
      this.home = { href: home };
    } else {
      this.home = null;
    }

    let settings = this.currentUser.settings;
    if (typeOf(settings) == 'object') {
      this.settings = { route: settings.route, model: settings.id };
    } else if (home === 'password') {
      this.settings = null;
    } else if (home) {
      this.settings = { href: settings };
    } else {
      this.settings = null;
    }

    let route = this.router.currentRouteName;

    if ((!this.session.isAuthenticated && route === 'index') || route === 'sign-in' || route === 'password' || route === 'reset' || route === '404') {
      this.showLogo = false;
    }

    let role = this.currentUser.roleName;
    if (role === 'Member') {
      this.navBgColor = 'navbar-member';
      this.navButtonColor = 'navbar-button-member';
    } else if (role === 'Consortium') {
      this.navBgColor = 'navbar-consortium';
      this.navButtonColor = 'navbar-button-consortium';
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