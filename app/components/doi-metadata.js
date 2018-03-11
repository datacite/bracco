import Ember from 'ember';
import fetch from 'fetch';
import vkbeautify from 'npm:vkbeautify';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  metadata: null,
  output: null,
  summary: true,

  showMetadata(metadata) {
    if (metadata === "summary") {
      this.set('summary', true);
    } else if (metadata === "datacite") {
      this.set('output', this.get('model').get("xml"));
      this.set('summary', false);
    } else {
      this.set('output', null);
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
          self.set('output', vkbeautify.json(JSON.stringify(response)));
          self.set('summary', false);
        } else {
          let reader = new FileReader();
          reader.onloadend = function() {
            self.set('output', reader.result);
            self.set('summary', false);
          }
          reader.readAsText(response);
        }
      });
    }
    // this.get('router').transitionTo({ queryParams: { metadata: metadata } });
  },

  actions: {
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    }
  },

  didInsertElement() {
    let formats = { 'summary': 'Summary View',
                    'datacite': 'DataCite XML',
                    'schema_org': 'Schema.org JSON-LD',
                    'citeproc': 'Citeproc JSON',
                    'codemeta': 'Codemeta',
                    'bibtex': 'BibTeX',
                    'ris': 'RIS' };
    this.set('formats', formats);
  }
});
