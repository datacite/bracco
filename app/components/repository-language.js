// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import { tracked } from '@glimmer/tracking';

const languageList = ISO6391.getAllNames();

export default class RepositoryLanguage extends Component {
  @service
  store;

  languageList = languageList;
  languages = languageList;

  @computed('language')
  get languageName() {
    return ISO6391.getName(this.language);
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
    const selectedLanguageCode = language === null ? null : ISO6391.getCode(language);
    this.model
      .language
      .replace(this.index, 1, [selectedLanguageCode]);
    this.languages = languageList;
  }

  @action
  deleteLanguage() {
    this.model.language.removeAt(this.index);
  }
}
