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
      this.set('output', false);
    } else {
      this.set('output', null);
      let self = this;
      let url = ENV.APP_URL + '/' + this.get('model').get("doi");
      let acceptHeaders = {
        'datacite': 'application/vnd.datacite.datacite+xml',
        'schema_org': 'application/vnd.schemaorg.ld+json',
        'citeproc': 'application/vnd.citationstyles.csl+json',
        'codemeta': 'application/vnd.codemeta.ld+json',
        'bibtex': 'application/x-bibtex',
        'ris': 'application/x-research-info-systems',
        'jats': 'application/vnd.jats+xml' };

      let result = fetch(url, {
        headers: {
          'Accept': acceptHeaders[metadata]
        }
      }).then(function(response) {
        if (response.ok) {
          return response.blob();
        } else {
          console.log(response.statusText);
          return response.statusText;
        }
      });

      result.then(function(response) {
        if (typeof response === 'string') {
          self.set('output', vkbeautify.json(JSON.stringify(response)));
        } else {
          let reader = new FileReader();
          reader.onloadend = function() {
            console.log(reader.result);
            self.set('output', vkbeautify.xml(reader.result));
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
                    'ris': 'RIS',
                    'jats': 'JATS' };
    this.set('formats', formats);
  }
});
