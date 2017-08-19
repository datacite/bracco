import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  metadata: null,

  showMetadata(metadata) {
    if (!metadata || metadata === "html") {
      this.set('output', null);
    } else if (metadata === "datacite") {
      this.set('output', this.get('model').get("datacite"));
    } else {
      let self = this;
      let url = ENV.DATA_URL + '/' + this.get('model').get("doi");
      let acceptHeaders = { 'datacite': 'application/vnd.datacite.datacite+xml',
                            'schema_org': 'application/vnd.schemaorg.ld+json',
                            'citeproc': 'application/vnd.citationstyles.csl+json',
                            'rdf_xml': 'application/rdf+xml',
                            'turtle': 'text/turtle',
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

      result.then(function(result) {
        if (typeof result === 'string') {
          self.set('output', result);
        } else {
          let reader = new FileReader();
          reader.onloadend = function() {
            self.set('output', reader.result);
          }
          reader.readAsText(result);
        }
      });
    }
    this.get('router').transitionTo({ queryParams: { metadata: metadata } });
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
                    // 'rdf_xml': 'RDF-XML',
                    // 'turtle': 'Turtle',
                    // 'codemeta': 'Codemeta',
                    // 'bibtex': 'BibTeX',
                    // 'ris': 'RIS' };
    this.set('formats', formats);
  }
});
