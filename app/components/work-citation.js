import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  citation: null,

  showCitation(citation) {
    let self = this;
    let url = ENV.DATA_URL + '/' + this.get('model').get("doi");
    let acceptHeaders = { 'apa': 'text/x-bibliography; style=apa',
                          'harvard-cite-them-right': 'text/x-bibliography; style=harvard-cite-them-right',
                          'modern-language-association': 'text/x-bibliography; style=modern-language-association',
                          'vancouver': 'text/x-bibliography; style=vancouver',
                          'chicago-fullnote-bibliography': 'text/x-bibliography; style=chicago-fullnote-bibliography',
                          'ieee': 'text/x-bibliography; style=ieee' };

    let response = fetch(url, {
      headers: {
        'Accept': acceptHeaders[citation]
      }
    }).then(function(response) {
      if (response.ok) {
       //console.log(response.text())
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }, function(error) {
      console.log(error.message);
    }).then(function(result) {
        // if (typeof result === 'string') {
        //   self.set('citation-output', result);
        // } else {
      let reader = new FileReader();
      reader.onloadend = function() {
        self.set('citation-output', reader.result);
      }
      reader.readAsText(result);
    });
    console.log(self.get('citation-output'))
    this.get('router').transitionTo({ queryParams: { citation: citation } });
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
