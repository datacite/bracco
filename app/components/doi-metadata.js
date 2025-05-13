// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import vkbeautify from 'vkbeautify';
import ENV from 'bracco/config/environment';
import { UploadFile, UploadFileReader } from 'ember-file-upload';
import { tracked } from '@glimmer/tracking';

@tagName('div')
export default class DoiMetadata extends Component {
  @service currentUser;

  hasMetadata = false;
  metadata = null;
  @tracked output = null;
  summary = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // show metadata if at least one of these attributes is set
    if (
      isPresent(this.model.publicationYear) ||
      isPresent(this.model.titles) ||
      isPresent(this.model.publisher) ||
      isPresent(this.model.creators) ||
      (this.model.types instanceof Object && !!this.model.types.resourceTypeGeneral) ||
      (this.model.types instanceof Object && !!this.model.types.resourceType)
    ) {
      this.hasMetadata = true;
    }

    let formats = {
      summary: 'Summary View',
      datacite: 'DataCite XML',
      datacite_json: 'DataCite JSON',
      schema_org: 'Schema.org JSON-LD',
      citeproc: 'Citeproc JSON',
      codemeta: 'Codemeta JSON',
      bibtex: 'BibTeX',
      ris: 'RIS',
      jats: 'JATS XML'
    };
    this.formats = formats;
  }

  showMetadata(metadata) {

    if (metadata === 'summary') {
      this.output = '';
    } else {
      this.output = '';
      let self = this;
      let url = ENV.API_URL + '/dois/' + this.model.doi;
      let acceptHeaders = {
        datacite: 'application/vnd.datacite.datacite+xml',
        datacite_json: 'application/vnd.datacite.datacite+json',
        schema_org: 'application/vnd.schemaorg.ld+json',
        citeproc: 'application/vnd.citationstyles.csl+json',
        codemeta: 'application/vnd.codemeta.ld+json',
        bibtex: 'application/x-bibtex',
        ris: 'application/x-research-info-systems',
        jats: 'application/vnd.jats+xml'
      };
      let headers = { Accept: acceptHeaders[metadata] };
      if (this.currentUser.jwt) {
        headers = {
          Authorization: 'Bearer ' + this.currentUser.jwt,
          Accept: acceptHeaders[metadata]
        };
      }
      let result = fetch(url, {
        headers
      }).then(function (response) {
        if (response.ok) {
          return response.blob();
        } else {
          return response.statusText;
        }
      });

      result.then(async function (response) {
        if (typeof response === 'string') {
          self.output = vkbeautify.json(JSON.stringify(response));
        } else {
          let reader = UploadFile.fromBlob(response, 'blob')
          reader.readAsText().then(
            (result) => {
              self.output = vkbeautify.xml(result);
            },
            (err) => {
              console.error(err);
            }
          );
        }
      });
    }
    // this.router.transitionTo({ queryParams: { metadata: metadata } });
  }

  @action
  selectMetadata(metadata) {
    this.showMetadata(metadata);
  }
}
