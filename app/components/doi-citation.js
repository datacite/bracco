import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  citation: null,
  citationOutput: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectStyle('apa');
  },

  selectStyle(style) {
    let self = this;
    let url = ENV.APP_URL + '/' + this.get('model').get("doi") + '?style=' + style;
    let result = fetch(url, {
      headers: {
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
  },

  didInsertElement() {
    let citationFormats = { 'apa': 'APA',
                            'harvard-cite-them-right': 'Harvard',
                            'modern-language-association': 'MLA',
                            'vancouver': 'Vancouver',
                            'chicago-fullnote-bibliography': 'Chicago',
                            'ieee': 'IEEE',
                            'gost-r-7-0-5-2008': 'GOST R 7.0.5-2008' };
    this.set('citationFormats', citationFormats);
  }
});
