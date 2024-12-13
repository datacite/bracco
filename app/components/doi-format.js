// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import mime from 'mime/lite';
import { tracked } from '@glimmer/tracking';

const FORMATS = Object.keys(mime._extensions);

function getMatchingFormats(input) {
  const matchingFormats = FORMATS.filter((ext) =>
    ext.includes(input.toLowerCase())
  );
  return matchingFormats;
}

export default class DoiFormat extends Component {
  @service
  store;

  constructor(...args) {
    super(...args);
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

        this.model.formats.splice(this.index, 1, select.searchText);
        this.formats = FORMATS;
      }
    }
  }

  @action
  searchFormat(query) {
    this.formats = getMatchingFormats(query);
  }

  @action
  selectFormat(formatExtension) {
    this.model.formats.splice(this.index, 1, formatExtension);
    this.model.formats = Array.from(this.model.formats);
  }

  @action
  deleteFormat() {
    this.model.formats.splice(this.index, 1);
    this.model.formats = Array.from(this.model.formats);
  }
}
