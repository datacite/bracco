import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { UploadFile, UploadFileReader } from 'ember-file-upload';

@classic
@tagName('div')
export default class DoiCitation extends Component {
  @service
  currentUser;

  citation = null;
  citationOutput = null;

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
    this.set('citationFormats', citationFormats);
  }

  selectStyle(style) {
    let self = this;
    let url =
      ENV.API_URL + '/dois/' + this.model.get('doi') + '?style=' + style;
    let headers = { Accept: 'text/x-bibliography' };
    if (this.currentUser.get('jwt')) {
      headers = {
        Authorization: 'Bearer ' + this.currentUser.get('jwt'),
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
        self.set('citationOutput', response);
      } else {
        if (self.isDestroying || self.isDestroyed) {
          return;
        }
        let reader = UploadFile.fromBlob(response, 'blob')
        reader.readAsText().then(
          (result) => {
            self.set('citationOutput', result);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
    // this.get('router').transitionTo({ queryParams: { citation: citation } });
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
