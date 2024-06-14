import Component from '@ember/component';
import { FileReader } from 'ember-file-upload';

export default Component.extend({
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  },

  actions: {
    didSelectFiles(file) {
      let reader = new FileReader();
      let self = this;

      reader.readAsText(file.blob).then(
        (xml) => {
          self.get('model').set('xml', xml);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
});
