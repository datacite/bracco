import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
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

    this.selected = this.selected || [];
  },

  actions: {
    createOnEnter(select, e) {
      if (
        e.keyCode === 13 &&
        select.isOpen &&
        !select.highlighted &&
        !isBlank(select.searchText)
      ) {
        if (!this.selected.includes(select.searchText)) {
          this.formats.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('formatExtension', select.searchText);
          this.set('formats', FORMATS);
        }
      }
    },
    searchFormat(query) {
      this.set('formats', getMatchingFormats(query))
    },
    selectFormat(formatExtension) {
      if (formatExtension) {
        this.fragment.set('formatExtension', formatExtension);
      } else {
        this.fragment.set('formatExtension', null);
      }
    },
    deleteFormat() {
      this.model.get('formats').removeAt(this.index);
    },
  }
});
