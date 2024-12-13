// Finish conversion of this component to a @glimmer component.

import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { UploadFile, UploadFileReader } from 'ember-file-upload';
import { tracked } from '@glimmer/tracking';

@tagName('div')
export default class DoiCitation extends Component {
  @service
  currentUser;

  citation = null;
  @tracked citationOutput = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.selectStyle('apa');

    let citationFormats = {
      apa: 'APA',
      'harvard-cite-them-right': 'Harvard',
      'modern-language-association': 'MLA',
      vancouver: 'Vancouver',
      'chicago-fullnote-bibliography': 'Chicago',
      ieee: 'IEEE'
    };
    this.citationFormats = citationFormats;
  }

  selectStyle(style) {
    let self = this;
    let url =
      ENV.API_URL + '/dois/' + this.model.doi + '?style=' + style;
    let headers = { Accept: 'text/x-bibliography' };
    if (this.currentUser.jwt) {
      headers = {
        Authorization: 'Bearer ' + this.currentUser.jwt,
        Accept: 'text/x-bibliography'
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
        self.citationOutput = response;
      } else {
        if (self.isDestroying || self.isDestroyed) {
          return;
        }
        let reader = UploadFile.fromBlob(response, 'blob')
        reader.readAsText().then(
          (result) => {
            self.citationOutput = result;
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  @action
  doSelectStyle(style) {
    // APA is default citation style
    style = style === undefined ? 'apa' : style;
    this.selectStyle(style);
  }

  didRender() {
    super.didRender(...arguments);
  }
}