// Finish conversion of this component to a @glimmer component.
import { w } from '@ember/string';
import { A } from '@ember/array';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiHealth extends Component {
  @tracked isFound = null;
  @tracked hasLandingPage = null;
  @tracked hasDoi = null;
  @tracked hasSchemaOrg = null;

  didReceiveAttrs(...args) {
    super.didReceiveAttrs(...args);
    
    if (this.model.landingPage.status == 200) {
      let redirectText = 'resolved ';
      if (this.model.landingPage.redirectCount > 1) {
        let redirectUrls = this.model
          .landingPage
          .redirectUrls.join(', ');
        redirectText =
          'redirected <strong>' +
          this.model.landingPage.redirectCount +
          ' </strong> times (' +
          redirectUrls +
          '), and resolved to <a href="' +
          this.model.landingPage.url +
          '">' +
          this.model.landingPage.url +
          '</a> ';
      } else if (this.model.landingPage.redirectCount > 0) {
        redirectText =
          'redirected <strong>once</strong>, and resolved to <a href="' +
          this.model.landingPage.url +
          '">' +
          this.model.landingPage.url +
          '</a> ';
      }
      this.isFound = {
        text: 'The URL resolves properly.',
        helpText:
          'The link check ' +
          redirectText +
          'with HTTP status code <strong>' +
          this.model.landingPage.status +
          '</strong>.',
        isChecked: true
      };
    } else {
      this.isFound = {
        text: 'The URL resolves properly.',
        helpText:
          'The link check returned the HTTP status code <strong>' +
          this.model.landingPage.status +
          '</strong>. This can be a temporal problem and we will repeat the link check.',
        isChecked: false
      };
    }

    let contentType = this.model.landingPage.contentType;
    if (contentType) {
      contentType = A(contentType.split(';')).firstObject.trim();
    } else {
      contentType = 'unknown';
    }
    if (w('text/html application/json').includes(contentType)) {
      this.hasLandingPage = {
        text: 'The URL resolves to a landing page.',
        helpText:
          'The link check returned the HTTP content type <strong>' +
          contentType +
          '</strong>.',
        isChecked: true
      };
    } else {
      this.hasLandingPage = {
        text: 'The URL resolves to a landing page.',
        helpText:
          'The link check returned the HTTP content type <strong>' +
          contentType +
          '</strong>. We recommend to have the URL resolve to a page of content type <strong>text/html</strong>.',
        isChecked: false
      };
    }
    if (this.model.landingPage.bodyHasPid) {
      this.hasDoi = {
        text: 'The landing page includes the DOI.',
        helpText: 'The link check found the DOI in the landing page HTML.',
        isChecked: true
      };
    } else {
      this.hasDoi = {
        text: 'The landing page includes the DOI.',
        helpText:
          'The link check did not find the DOI in the landing page HTML.',
        isChecked: false
      };
    }
    if (this.model.landingPage.hasSchemaOrg) {
      this.hasSchemaOrg = {
        text: 'The landing page includes metadata in schema.org format.',
        helpText:
          'The link check found embedded JSON-LD with @context <strong>"http://schema.org"</strong>.',
        isChecked: true
      };
    } else {
      this.hasSchemaOrg = {
        text: 'The landing page includes metadata in schema.org format.',
        helpText:
          'The link check found no embedded JSON-LD with @context <strong>"http://schema.org"</strong>. Please reach out to DataCite Support if we missed embedded schema.org metadata.',
        isChecked: false
      };
    }
  }
}
