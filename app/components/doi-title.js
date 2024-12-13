// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import LanguageComputedMixin from '../mixins/language-computed';

const titleTypes = ['AlternativeTitle', 'Subtitle', 'TranslatedTitle', 'Other'];
const languageList = ISO6391.getAllNames();

export default class DoiTitle extends Component.extend(LanguageComputedMixin) {
  titleTypes = titleTypes;
  languageList = languageList;
  languages = languageList;

  @action
  updateTitle(value) {
    this.fragment.title = value;
  }

  @action
  deleteTitle() {
    this.model.titles.removeObject(this.fragment);
  }

  @action
  selectTitleType(titleType) {
    this.fragment.titleType = titleType;
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
    if (language) {
      this.fragment.lang = ISO6391.getCode(language);
    } else {
      this.fragment.lang = null;
    }
    this.set('languages', languageList);
  }
}
