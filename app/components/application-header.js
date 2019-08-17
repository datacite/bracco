import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Component.extend({
  session: service(),
  currentUser: service(),

  default: false,
  type: 'transparent',
  title: null,
  home: '/',
  user: true,
  data: {},

  didReceiveAttrs() {
    this._super(...arguments);

    if (this['default']) {
      this.set('type', null);
      this.set('title', htmlSafe(ENV.SITE_TITLE));
    } else if (this['sign-in']) {
      this.set('title', htmlSafe(ENV.SITE_TITLE));
      this.set('user', false);
    }

    let home = this.currentUser.get('home');
    if (typeOf(home) == 'object') {
      this.set('home', { route: home.route, model: home.id });
    } else if (home === "password") {
      this.set('home', null);
    } else if (home) {
      this.set('home', { href: home });
    } else {
      this.set('home', null);
    }

    let settings = this.currentUser.get('settings');
    if (typeOf(settings) == 'object') {
      this.set('settings', { route: settings.route, model: settings.id });
    } else if (settings) {
      this.set('settings', { href: settings });
    } else {
      this.set('settings', null);
    }

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (ENV.API_URL === "https://api.datacite.org") {
        data.header_links = data.production_links;
      } else {
        data.header_links = data.stage_links;
      }
      self.set('data', data);
    });
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
