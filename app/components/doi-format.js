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
  didReceiveAttrs() {
    this._super(...arguments);
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
          this.model.get('formats').replace(this.index, 1, [ select.searchText ]);
          // this.set('fragment', select.searchText);
          this.set('formats', FORMATS);
        }
      }
    },
    searchFormat(query) {
      this.set('formats', getMatchingFormats(query))
    },
    selectFormat(formatExtension) {
      this.model.get('formats').replace(this.index, 1, [ formatExtension ]);
      // this.set('fragment', formatExtension);
    },
    onBlur() {
      console.log(0)
      // this.model.get('formats').replace(this.index, 1, [ this.fragment ]);
      console.log(9)
    },
    deleteFormat() {
      this.model.get('formats').removeAt(this.index);
    }
  }
});
