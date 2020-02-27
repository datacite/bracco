import Component from '@ember/component';
import { computed } from '@ember/object';
import ISO6391 from 'iso-639-1';


const languageList = ISO6391.getAllNames();

export default Component.extend({
  languageList,
  languages: languageList,
  language: computed('model.language', function() {
    return ISO6391.getName(this.get('model.language'));
  }),


  actions: {
    searchLanguage(query) {
      let languages = languageList.filter(function(language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('languages', languages);
    },
    selectLanguage(language) {
      if (language) {
        this.model.set('language', ISO6391.getCode(language));
      } else {
        this.model.set('language', null);
      }
      this.set('languages', languageList);
    },
  },
});
