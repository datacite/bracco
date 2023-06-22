import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import FileReader from 'ember-file-upload/system/file-reader';

export default Component.extend({
  currentUser: service(),

  tagName: 'div',
  citation: null,
  citationOutput: null,

  didReceiveAttrs() {
    this._super(...arguments);

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
  },

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

    result.then(function (response) {
      if (typeof response === 'string') {
        self.set('citationOutput', response);
      } else {
        if (self.isDestroying || self.isDestroyed) {
          return;
        }
        let reader = new FileReader();
        reader.readAsText(response).then(
          (r) => {
            self.set('citationOutput', r);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
    // this.get('router').transitionTo({ queryParams: { citation: citation } });
  },

  actions: {
    selectStyle(style) {
      // APA is default citation style
      style = style === undefined ? 'apa' : style;
      this.selectStyle(style);
    }
  },

  didRender() {
    this._super(...arguments);

  },
});
