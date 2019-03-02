import { computed } from '@ember/object';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';

const titleTypeList = [
  'AlternativeTitle',
  'Subtitle',
  'TranslatedTitle',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default Component.extend({
  titleTypeList,
  titleTypes: titleTypeList,
  languageList,
  languages: languageList,
  language: computed('fragment.lang', function () {
    return ISO6391.getName(this.get('fragment.lang'));
  }),

  actions: {
    updateTitle(value) {
      this.fragment.set('title', value);
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
    },
    searchTitleType(query) {
      var titleTypes = titleTypeList.filter(function (titleType) {
        return titleType.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('titleTypes', titleTypes);
    },
    selectTitleType(titleType) {
      this.fragment.set('titleType', titleType);
      this.set('titleTypes', titleTypeList);
    },
    searchLanguage(query) {
      var languages = languageList.filter(function (language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('languages', languages);
    },
    selectLanguage(language) {
      if (language) {
        this.fragment.set('lang', ISO6391.getCode(language));
      } else {
        this.fragment.set('lang', null);
      }
      this.set('languages', languageList);
    },
  }
});
