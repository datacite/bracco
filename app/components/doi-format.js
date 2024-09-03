import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import mime from 'mime/lite';

const FORMATS = Object.keys(mime._extensions);

function getMatchingFormats(input) {
  const matchingFormats = FORMATS.filter((ext) =>
    ext.includes(input.toLowerCase())
  );
  return matchingFormats;
}

@classic
export default class DoiFormat extends Component {
  @service
  store;

  init(...args) {
    super.init(...args);
    this.formats = FORMATS;

    this.selected = this.selected || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }

  @action
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

        this.model.get('formats').splice(this.index, 1, select.searchText);
        this.set('formats', FORMATS);
      }
    }
  }

  @action
  searchFormat(query) {
    this.set('formats', getMatchingFormats(query));
  }

  @action
  selectFormat(formatExtension) {
    this.model.get('formats').splice(this.index, 1, formatExtension);
    this.model.set('formats', Array.from(this.model.get('formats')));
  }

  @action
  deleteFormat() {
    this.model.get('formats').splice(this.index, 1);
    this.model.set('formats', Array.from(this.model.get('formats')));
  }
}
