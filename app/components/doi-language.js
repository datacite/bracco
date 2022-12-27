import Component from '@ember/component';
import { computed } from '@ember/object';
import ISO6391 from 'iso-639-1';
import { isBlank } from '@ember/utils';

const languageList = ISO6391.getAllNames();

export default Component.extend({
  languageList,
  languages: languageList,
  language: computed('model.language', function() {
    return ISO6391.getName(this.get('model.language')) !== '' ? ISO6391.getName(this.get('model.language')) : this.get('model.language');
  }),

  init(...args) {
    this._super(...args);

    this.selected = this.selected || [];
  },

  setLanguage(language) {
    if (ISO6391.getCode(language)) {
      this.model.set('language', ISO6391.getCode(language));
    } else if (language) {
      this.model.set('language', language);
      this.get('model.language')
    } else {
      this.model.set('language', null);
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (
        e.keyCode === 13 &&
        select.isOpen &&
        !select.highlighted &&
        !isBlank(select.searchText)
      ) {
        if (!this.selected.includes(select.searchText)) {
          this.setLanguage(select.searchText)
          select.actions.choose(select.searchText);
        }
      }
    },
    searchLanguage(query) {
      let languages = languageList.filter(function(language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('languages', languages);
    },
    selectLanguage(language) {
      this.setLanguage(language);
      this.set('languages', this.languageList);
    },
  },
});
