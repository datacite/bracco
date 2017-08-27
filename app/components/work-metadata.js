import Ember from 'ember';
import fetch from 'fetch';
import vkbeautify from 'npm:vkbeautify';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  metadata: null,
  output: null,

  showMetadata(metadata) {
    if (!metadata || metadata === "html") {
      this.set('output', null);
    } else if (metadata === "datacite") {
      let output = vkbeautify.xml(this.get('model').get("datacite"));
      console.log(output)
      this.set('output', output);
    } else {
      let self = this;
      let url = ENV.DATA_URL + '/' + this.get('model').get("doi");
      let acceptHeaders = { 'datacite': 'application/vnd.datacite.datacite+xml',
                            'schema_org': 'application/vnd.schemaorg.ld+json',
                            'citeproc': 'application/vnd.citationstyles.csl+json',
                            'codemeta': 'application/vnd.codemeta.ld+json',
                            'bibtex': 'application/x-bibtex',
                            'ris': 'application/x-research-info-systems' };

      let result = fetch(url, {
        headers: {
          'Accept': acceptHeaders[metadata]
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
            self.set('output', reader.result);
          }
          reader.readAsText(response);
        }
      });
    }
    //this.get('router').transitionTo({ queryParams: { metadata: metadata } });
  },

  actions: {
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    }
  },

  didInsertElement: function() {
    let formats = { 'html': 'HTML',
                    'datacite': 'DataCite XML' };
                    // 'schema_org': 'Schema.org JSON-LD',
                    // 'citeproc': 'Citeproc JSON',
                    // 'codemeta': 'Codemeta',
                    // 'bibtex': 'BibTeX',
                    // 'ris': 'RIS' };
    this.set('formats', formats);
  }
});
