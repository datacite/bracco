import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import LanguageComputedMixin from '../mixins/language-computed';

const titleTypes = ['AlternativeTitle', 'Subtitle', 'TranslatedTitle', 'Other'];
const languageList = ISO6391.getAllNames();

@classic
export default class DoiTitle extends Component.extend(LanguageComputedMixin) {
  titleTypes = titleTypes;
  languageList = languageList;
  languages = languageList;

  @action
  updateTitle(value) {
    this.fragment.set('title', value);
  }

  @action
  deleteTitle() {
    this.model.get('titles').removeObject(this.fragment);
  }

  @action
  selectTitleType(titleType) {
    this.fragment.set('titleType', titleType);
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
      this.fragment.set('lang', ISO6391.getCode(language));
    } else {
      this.fragment.set('lang', null);
    }
    this.set('languages', languageList);
  }
}
