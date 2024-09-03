import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import { UploadFile, UploadFileReader } from 'ember-file-upload';

@classic
export default class DoiUpload extends Component {
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
  }

  @action
  async didSelectFiles(file) {
    file.readAsText().then((xml) => {
        this.model.set('xml', xml)
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
