import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';

export default Component.extend({
  session: service(),
  currentUser: service(),
  features: service(),

  default: false,
  type: 'transparent',
  title: null,
  home: '/',
  user: true,
  showLogo: true,
  navBgColor: '',
  navButtonColor: '',

  init(...args) {
    this._super(...args);

    if (ENV.featureFlags['enable-doi-estimate']) {
      this.get('features').enable('enableDoiEstimate');
    } else {
      this.get('features').disable('enableDoiEstimate');
    }

    this.data = this.data || {};
  },

  didReceiveAttrs() {
    this._super(...arguments);

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
    console.log(route);
    if (route === 'index' || route === 'sign-in' || route === '404') {
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
  },

  actions: {
    transitionNoAccess() {
      this.router.transitionTo(this.home);
    },
    invalidateSession() {
      this.session.invalidate();
    }
  }
});
