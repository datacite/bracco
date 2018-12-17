import Component from '@ember/component';
import { isPresent } from '@ember/utils';

export default Component.extend({
  hasError: null,
  isFound: null,
  hasLandingPage: null,
  hasDoi: null,
  hasSchemaOrg: null,

  didInsertElement() {
    this.set('hasError', isPresent(this.get('model').get("landingPage").error));
    
    if (this.get('model').get("landingPage").status == 200) {
      this.set('isFound', {
        text: "The URL resolves properly.",
        helpText: "The link check returned the HTTP status code <strong>" + this.get('model').get("landingPage").status + "</strong>.",
        isChecked: true
      })
    } else {
      this.set('isFound', {
        text: "The URL does not resolve properly.",
        helpText: "The link check returned the HTTP status code <strong>" + this.get('model').get("landingPage").status + "</strong>. This can be a temporal problem and we will repeat the link check.",
        isChecked: false
      })
    }
    let contentType = this.get('model').get("landingPage").contentType;
    if (contentType) {
      contentType = contentType.split(';').get('firstObject').trim();
    } else {
      contentType = "unknown";
    }
    if (Ember.String.w("text/html application/json").includes(contentType)) {     
      this.set('hasLandingPage', {
        text: "The URL resolves to a landing page.",
        helpText: "The link check returned the HTTP content type <strong>" + contentType + "</strong>.",
        isChecked: true
      })
    } else {
      this.set('hasLandingPage', {
        text: "The URL does not resolve to a landing page.",
        helpText: "The link check returned the HTTP content type <strong>" + contentType + "</strong>.",
        isChecked: false
      })
    }
    if (this.get('model').get("landingPage").bodyHasPid) {
      this.set('hasDoi', {
        text: "The landing page includes a machine-readable DOI.",
        helpText: "The link check found the DOI in a <strong>DC.identifier</strong> or <strong>citation_doi</strong> meta tag, or in <strong>schema.org</strong> metadata.",
        isChecked: true
      })
    } else {
      this.set('hasDoi', {
        text: "No machine-readable DOI was found on the landing page.",
        helpText: "The link check did not find the DOI in a <strong>DC.identifier</strong> or <strong>citation_doi</strong> meta tag, or in <strong>schema.org</strong> metadata.",
        isChecked: false
      })
    }
    if (this.get('model').get("landingPage").hasSchemaOrg) {
      this.set('hasSchemaOrg', {
        text: "The landing page includes metadata in schema.org format.",
        helpText: "The link check found embedded JSON-LD with @context <strong>\"http://schema.org\"<strong>.",
        isChecked: true
      })
    } else {
      this.set('hasSchemaOrg', {
        text: "No metadata in schema.org format was found on the landing page.",
        helpText: "The link check found no embedded JSON-LD with @context <strong>\"http://schema.org\"<strong>.",
        isChecked: false
      })
    }
  }
});
