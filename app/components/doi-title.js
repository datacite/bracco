import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import { computed } from '@ember/object';
import LanguageComputedMixin from '../mixins/language-computed';

const titleTypes = ['AlternativeTitle', 'Subtitle', 'TranslatedTitle', 'Other'];
const languageList = ISO6391.getAllNames();

export default Component.extend(LanguageComputedMixin, {
  titleTypes,
  languageList,
  languages: languageList,

  actions: {
    updateTitle(value) {
      this.fragment.set('title', value);
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
    },
    selectTitleType(titleType) {
      this.fragment.set('titleType', titleType);
    },
    searchLanguage(query) {
      let languages = languageList.filter(function (language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('languages', languages);
    },
    selectLanguage(language) {
      if (language) {
        this.fragment.set('lang', ISO6391.getCode(language));
      } else {
        this.fragment.set('lang', null);
      }
      this.set('languages', languageList);
    }
  }
});
