import Ember from 'ember';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';
const { service } = Ember.inject;

export default Ember.Component.extend({
  currentUser: service(),

  default: false,
  type: 'transparent',
  title: null,
  home: '/',
  user: true,
  data: {},

  // init: function () {
  //   this._super();
  //
  //   if (!this.get('default')) {
  //     Ember.run.schedule("afterRender",this,function() {
  //       this.send("transitionNoAccess");
  //     });
  //   }
  // },

  actions: {
    transitionNoAccess() {
      this.get('router').transitionTo(this.get('home'));
    }
  },

  didInsertElement() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    } else if (this.get('sign-in')) {
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
      this.set('user', false);
    }

    let home = this.get('currentUser').get('home');
    if (Ember.typeOf(home) == 'object') {
      this.set('home', { route: home.route, model: home.id });
    } else if (home === "password") {
      this.set('home', null);
    } else if (home) {
      this.set('home', { href: home });
    } else {
      this.set('home', null);
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
  }
});
