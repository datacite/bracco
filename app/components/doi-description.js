// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import LanguageComputedMixin from '../mixins/language-computed';
import { tracked } from '@glimmer/tracking';

const descriptionTypes = [
  'Abstract',
  'Methods',
  'SeriesInformation',
  'TableOfContents',
  'TechnicalInfo',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default class DoiDescription extends Component.extend(LanguageComputedMixin) {
  descriptionTypes = descriptionTypes;
  languageList = languageList;
  languages = languageList;

  @computed('fragment.descriptionType')
  get isSeriesInformation() {
    return this.fragment.descriptionType == 'SeriesInformation';
  }

  @action
  updateDescription(value) {
    this.fragment.set('description', value);
  }

  @action
  deleteDescription() {
    this.model.descriptions.removeObject(this.fragment);
  }

  @action
  selectDescriptionType(descriptionType) {
    this.fragment.descriptionType = descriptionType;
  }

  @action
  searchLanguage(query) {
    let languages = languageList.filter(function (language) {
      return language.toLowerCase().startsWith(query.toLowerCase());
    });
    this.languages = languages;
  }

  @action
  selectLanguage(language) {
    if (language) {
      this.fragment.lang = ISO6391.getCode(language);
    } else {
      this.fragment.lang = null;
    }
    this.languages = languageList;
  }
}
