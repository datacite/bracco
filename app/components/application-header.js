// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
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

  @tracked default = false;
  @tracked data = {}

  constructor(...args) {
    super(...args);

    if (ENV.featureFlags['enable-doi-estimate']) {
      this.features.enable('enableDoiEstimate');
    } else {
      this.features.disable('enableDoiEstimate');
    }
  }

  @computed('default')
  get type() {
    if (this.default) {
      return null;
    } else {
      return 'transparent';
    }
  }

  @computed('default','router.currentRouteName')
  get title() {
    if (this.default) {
      return htmlSafe(ENV.SITE_TITLE);
    } else if (this.router.currentRouteName == 'sign-in' ){
      return htmlSafe(ENV.SITE_TITLE);
    } else {
      return null;
    }
  }

  @computed('currentUser.home')
  get home() {
    let home = this.currentUser.home;

    if (typeOf(home) == 'object') {
      return { route: home.route, model: home.id };
    } else if (home === 'password') {
      return null;
    } else if (home) {
      return { href: home };
    } else {
      return null;
    }
  }

  @computed('currentUser.settings')
  get settings() {
    let settings = this.currentUser.settings;

    if (typeOf(settings) == 'object') {
      return { route: settings.route, model: settings.id };
    } else if (home === 'password') {
      return null;
    } else if (home) {
      return { href: settings };
    } else {
      return null;
    }
  }

  @computed('router.currentRouteName')
  get user() {
    let route = this.router.currentRouteName;

    if ((!this.session.isAuthenticated && route === 'index') || 
         route === 'sign-in' || 
         route === 'password' || 
         route === 'reset' || 
         route === '404') {
      return false;
    } else {
      return true;
    }
  }

  @computed('router.currentRouteName', 'session.isAuthenticated')
  get showLogo() {
    let route = this.router.currentRouteName;

    if ((!this.session.isAuthenticated && route === 'index') || route === 'sign-in' || route === 'password' || route === 'reset' || route === '404') {
      return false;
    } else {
      return true;
    }
  }

  @computed('currentUser.roleName')
  get navBgColor() {
    let role = this.currentUser.roleName;

    if (role == 'Member') {
      return 'navbar-member';
    } else if (role == 'Consortium') {
      return 'navbar-consortium'
    } else {
      return '';
    }
  }

  @computed('currentUser.roleName')
  get navButtonColor() {
    let role = this.currentUser.roleName;

    if (role == 'Member') {
      return 'navbar-button-member';
    } else if (role == 'Consortium') {
      return 'navbar-button-consortium'
    } else {
      return '';
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
