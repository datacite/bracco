import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'fragment.title': [
    validator('presence', {
      presence: true,
      isWarning: computed('model.model.state', 'model.model.prefix', function () {
        return (this.get('model.model.state') === 'draft' || this.get('model.model.prefix') === '10.5072');
      }),
      disabled: computed('model.model.mode', function () {
        return !["new", "edit"].includes(this.get('model.model.mode'));
      })
    })
  ]
});
const titleTypeList = [
  'AlternativeTitle',
  'Subtitle',
  'TranslatedTitle',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default Component.extend(Validations, {
  titleTypeList,
  titleTypes: titleTypeList,
  languageList,
  languages: languageList,
  language: computed('fragment.lang', function () {
    return ISO6391.getName(this.get('fragment.lang'));
  }),
  errorMessage: computed('validations.messages', function () {
    if (this.get('validations.messages').length > 0) {
      return this.get('validations.messages').get('firstObject');
    } else {
      return null;
    }
  }),
  isValidating: false,
  
  actions: {
    updateTitle(value) {
      this.fragment.set('title', value);
      this.set('isValidating', !!value);
      this.setIsValidating(!!value);
      this.setHasErrors(!value);
    },
    validateTitle() {
      this.set('isValidating', !!this.get('fragment.title'));
      this.setIsValidating(!!this.get('fragment.title'));
      this.setHasErrors(!this.get('fragment.title'));
    },
    deleteTitle() {
      this.model.get('titles').removeObject(this.fragment);
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
