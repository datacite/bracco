// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import { isBlank } from '@ember/utils';

const languageList = ISO6391.getAllNames();

export default class DoiLanguage extends Component {
  languageList = languageList;
  languages = languageList;

  @computed('model.language')
  get language() {
    return ISO6391.getName(this.model.language) !== ''
      ? ISO6391.getName(this.model.language)
      : this.model.language;
  }

  constructor(...args) {
    super(...args);
    this.selected = this.selected || [];
  }

  setLanguage(language) {
    if (language ? ISO6391.getCode(language) : null) {
      this.model.language = ISO6391.getCode(language);
    } else if (language) {
      this.model.language = language;
    } else {
      this.model.language = null;
    }
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
        this.setLanguage(select.searchText);
        this.languageList.push(select.searchText);
        select.actions.choose(select.searchText);
      }
    }
  }

  @action
  searchLanguage(query) {
    let languages = languageList.filter(function (language) {
      return language.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('languages', languages);
  }

  @action
  selectLanguage(language) {
    this.setLanguage(language);
    this.set('languages', this.languageList);
  }
}
