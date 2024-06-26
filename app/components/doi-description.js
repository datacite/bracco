import Component from '@ember/component';
import { computed } from '@ember/object';
import ISO6391 from 'iso-639-1';
import LanguageComputedMixin from '../mixins/language-computed';

const descriptionTypes = [
  'Abstract',
  'Methods',
  'SeriesInformation',
  'TableOfContents',
  'TechnicalInfo',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default Component.extend(LanguageComputedMixin, {
  descriptionTypes,
  languageList,
  languages: languageList,
  isSeriesInformation: computed('fragment.descriptionType', function () {
    return this.get('fragment.descriptionType') == 'SeriesInformation';
  }),

  actions: {
    updateDescription(value) {
      this.fragment.set('description', value);
    },
    deleteDescription() {
      this.model.get('descriptions').removeObject(this.fragment);
    },
    selectDescriptionType(descriptionType) {
      this.fragment.set('descriptionType', descriptionType);
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
