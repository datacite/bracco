import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ISO6391 from 'iso-639-1';

const languageList = ISO6391.getAllNames();

export default Component.extend({
  store: service(),

  languageList,
  languages: languageList,
  languageName: computed('language', function () {
    return ISO6391.getName(this.language);
  }),

  actions: {
    searchLanguage(query) {
      let languages = languageList.filter(function (language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('languages', languages);
    },
    selectLanguage(language) {
      const selectedLanguageCode = language === null ? null : ISO6391.getCode(language);
      this.model
        .get('language')
        .replace(this.index, 1, [selectedLanguageCode]);
      this.set('languages', languageList);
    },
    deleteLanguage() {
      this.model.get('language').removeAt(this.index);
    }
  }
});
