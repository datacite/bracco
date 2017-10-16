import Ember from 'ember';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  default: false,
  type: 'transparent',
  title: null,
  home: '/',
  sandbox: null,
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

  didInsertElement: function() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }
    this.set('home', this.get('currentUser').get('home'));
    this.set('sandbox', this.get('currentUser').get('sandbox'));

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      data.header_links = data[ENV.environment + '_links'];
      self.set('data', data);
    });
  }
});
