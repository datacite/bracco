import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Component.extend({
  currentUser: service(),

  tagName: 'div',
  citation: null,
  citationOutput: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectStyle('apa');

    let citationFormats = { 
      'apa': 'APA',
      'harvard-cite-them-right': 'Harvard',
      'modern-language-association': 'MLA',
      'vancouver': 'Vancouver',
      'chicago-fullnote-bibliography': 'Chicago',
      'ieee': 'IEEE' };
    this.set('citationFormats', citationFormats);
  },

  selectStyle(style) {
    let self = this;
    let url = ENV.API_URL + '/dois/' + this.model.get("doi") + '?style=' + style;
    let result = fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + this.currentUser.get('jwt'),
        'Accept': 'text/x-bibliography'
      }
    }).then(function(response) {
      if (response.ok) {
        return response.blob();
      } else {
        return response.statusText;
      }
    });

    result.then(function(response) {
      if (typeof response === 'string') {
        self.set('citationOutput', response);
      } else {
        let reader = new FileReader();
        reader.onloadend = function() {
          self.set('citationOutput', reader.result);
        }
        reader.readAsText(response);
      }
    });
    //this.get('router').transitionTo({ queryParams: { citation: citation } });
  },

  actions: {
    selectStyle(style) {
      // APA is default citation style
      style = (style === undefined) ? 'apa' : style;
      this.selectStyle(style);
    }
  }
});
