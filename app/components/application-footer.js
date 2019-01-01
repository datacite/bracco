import { htmlSafe } from '@ember/template';
import Component from '@ember/component';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';
import isElectron from 'is-electron';

export default Component.extend({
  didInsertElement() {
    if (this['default']) {
      this.set('type', null);
      this.set('title', htmlSafe(ENV.SITE_TITLE));
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
