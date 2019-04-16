import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const titleTypes = [
  'AlternativeTitle',
  'Subtitle',
  'TranslatedTitle',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default Component.extend({
  titleTypes,
  languageList,
  languages: languageList,
  language: computed('fragment.lang', function () {
    return ISO6391.getName(this.get('fragment.lang'));
  }),
  errorMessage: computed('fragment.validations.messages', 'index', function () {
    if (this.get('fragment.validations.messages') && this.get('fragment.validations.messages').length > 0 && this.get('index') == 0) {
      return this.get('fragment.validations.messages').get('firstObject');
    } else {
      return null;
    }
  }),
  isValidating: false,

  validateTitle() {
    if (this.index == 0) {
      this.set('isValidating', !!this.get('fragment.title'));
      this.setIsValidating(!!this.get('fragment.title'));
      this.setHasErrors(!this.get('fragment.title'));

      // if (this.setHasErrors) {
      //   this.model.validations.
      // }
    }
  },
  
  actions: {
    updateTitle(value) {
      let isBlankTitle = isBlank(this.fragment.get('title'));
      this.fragment.set('title', value);
      if (isBlankTitle) {
        this.validateTitle();
      }
    },
    validateTitle() {
      this.validateTitle();
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
      this.validateTitle();
    },
    selectTitleType(titleType) {
      this.fragment.set('titleType', titleType);
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
