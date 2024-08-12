import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ISO6391 from 'iso-639-1';

const languageList = ISO6391.getAllNames();

@classic
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
      .get('language')
      .replace(this.index, 1, [selectedLanguageCode]);
    this.set('languages', languageList);
  }

  @action
  deleteLanguage() {
    this.model.get('language').removeAt(this.index);
  }
}
