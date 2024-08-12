import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
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

@classic
export default class DoiDescription extends Component.extend(LanguageComputedMixin) {
  descriptionTypes = descriptionTypes;
  languageList = languageList;
  languages = languageList;

  @computed('fragment.descriptionType')
  get isSeriesInformation() {
    return this.get('fragment.descriptionType') == 'SeriesInformation';
  }

  @action
  updateDescription(value) {
    this.fragment.set('description', value);
  }

  @action
  deleteDescription() {
    this.model.get('descriptions').removeObject(this.fragment);
  }

  @action
  selectDescriptionType(descriptionType) {
    this.fragment.set('descriptionType', descriptionType);
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
