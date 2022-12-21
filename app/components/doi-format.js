import Component from '@ember/component';
import { inject as service } from '@ember/service';
import mime from 'mime/lite'

const FORMATS = Object.keys(mime._extensions)

function getMatchingFormats(input) {
  const matchingFormats = FORMATS.filter(ext => ext.includes(input.toLowerCase()))
  return matchingFormats
}

export default Component.extend({
  store: service(),

  init(...args) {
    this._super(...args);
    this.formats = FORMATS;
  },

  actions: {
    searchFormat(query) {
      this.set('formats', getMatchingFormats(query))
    },
    selectFormat(format) {
      if (format) {
        this.fragment.set('format', format);
      } else {
        this.fragment.set('format', null);
      }
    },
    deleteFormat() {
      this.model.get('formats').removeAt(this.index);
    },
  }
});
