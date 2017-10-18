import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  citation: null,
  output: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.showCitation('apa');
  },

  showCitation(citation) {
    this.set('output', null);
    let self = this;
    let url = ENV.DATA_URL + '/' + this.get('model').get("doi");
    let acceptHeaders = { 'apa': 'text/x-bibliography; style=apa',
                          'harvard-cite-them-right': 'text/x-bibliography; style=harvard-cite-them-right',
                          'modern-language-association': 'text/x-bibliography; style=modern-language-association',
                          'vancouver': 'text/x-bibliography; style=vancouver',
                          'chicago-fullnote-bibliography': 'text/x-bibliography; style=chicago-fullnote-bibliography',
                          'ieee': 'text/x-bibliography; style=ieee' };

    let result = fetch(url, {
      headers: {
        'Accept': acceptHeaders[citation]
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
        self.set('output', response);
      } else {
        let reader = new FileReader();
        reader.onloadend = function() {
          //console.log(reader.result)
          self.set('output', reader.result);
        }
        reader.readAsText(response);
      }
    });
    //this.get('router').transitionTo({ queryParams: { citation: citation } });
  },

  actions: {
    selectCitation(citation) {
      // APA is default citation style
      citation = (citation === undefined) ? 'apa' : citation;
      this.showCitation(citation);
    }
  },

  didInsertElement: function() {
    let citationFormats = { 'apa': 'APA',
                            'harvard-cite-them-right': 'Harvard',
                            'modern-language-association': 'MLA',
                            'vancouver': 'Vancouver',
                            'chicago-fullnote-bibliography': 'Chicago',
                            'ieee': 'IEEE' };
    this.set('citationFormats', citationFormats);
  }
});
