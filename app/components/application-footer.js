import Ember from 'ember';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';
import isElectron from 'npm:is-electron';

export default Ember.Component.extend({
  didInsertElement: function() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }

    this.set('isElectron', isElectron());

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      self.set('data', data);
    });
  }
});
