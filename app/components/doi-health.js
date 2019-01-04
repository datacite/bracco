import { w } from '@ember/string';
import Component from '@ember/component';

export default Component.extend({
  isFound: null,
  hasLandingPage: null,
  hasDoi: null,
  hasSchemaOrg: null,

  didInsertElement() {
    if (this.model.get("landingPage").status == 200) {
      let redirectText = "resolved ";
      if (this.model.get("landingPage").redirectCount > 1) {
        let redirectUrls = this.model.get("landingPage").redirectUrls.join(', ')
        redirectText = "redirected <strong>" + this.model.get("landingPage").redirectCount + " </strong> times (" + redirectUrls + "), and resolved to <a href=\"" + this.model.get("landingPage").url + "\">" + this.model.get("landingPage").url + "</a> ";
      } else if (this.model.get("landingPage").redirectCount > 0) {
        redirectText = "redirected <strong>once</strong>, and resolved to <a href=\"" + this.model.get("landingPage").url + "\">" + this.model.get("landingPage").url + "</a> ";
      }
      this.set('isFound', {
        text: "The URL resolves properly.",
        helpText: "The link check " + redirectText + "with HTTP status code <strong>" + this.model.get("landingPage").status + "</strong>.",
        isChecked: true
      })
    } else {
      this.set('isFound', {
        text: "The URL does not resolve properly.",
        helpText: "The link check returned the HTTP status code <strong>" + this.model.get("landingPage").status + "</strong>. This can be a temporal problem and we will repeat the link check.",
        isChecked: false
      })
    }
    let contentType = this.model.get("landingPage").contentType;
    if (contentType) {
      contentType = contentType.split(';').get('firstObject').trim();
    } else {
      contentType = "unknown";
    }
    if (w("text/html application/json").includes(contentType)) {
      this.set('hasLandingPage', {
        text: "The URL resolves to a landing page.",
        helpText: "The link check returned the HTTP content type <strong>" + contentType + "</strong>.",
        isChecked: true
      })
    } else {
      this.set('hasLandingPage', {
        text: "The URL does not resolve to a landing page.",
        helpText: "The link check returned the HTTP content type <strong>" + contentType + "</strong>. We recommend to have the URL resolve to a page of content type <strong>text/html</strong>.",
        isChecked: false
      })
    }
    if (this.model.get("landingPage").bodyHasPid) {
      this.set('hasDoi', {
        text: "The landing page includes the DOI.",
        helpText: "The link check found the DOI in the landing page body.",
        isChecked: true
      })
    } else {
      this.set('hasDoi', {
        text: "No DOI was found on the landing page.",
        helpText: "The link check did not find the DOI in the landing page body.",
        isChecked: false
      })
    }
    if (this.model.get("landingPage").hasSchemaOrg) {
      this.set('hasSchemaOrg', {
        text: "The landing page includes metadata in schema.org format.",
        helpText: "The link check found embedded JSON-LD with @context <strong>\"http://schema.org\"</strong>.",
        isChecked: true
      })
    } else {
      this.set('hasSchemaOrg', {
        text: "No metadata in schema.org format was found on the landing page.",
        helpText: "The link check found no embedded JSON-LD with @context <strong>\"http://schema.org\"</strong>. Please reach out to DataCite Support if we missed embedded schema.org metadata.",
        isChecked: false
      })
    }
  }
});
