import Component from '@ember/component';
import { isBlank, typeOf } from '@ember/utils';
import ISO6391 from 'iso-639-1';
import LanguageComputedMixin from '../mixins/language-computed';

const languageList = ISO6391.getAllNames();

export default Component.extend(LanguageComputedMixin, {
  isSpdxId: false,
  languageList,
  languages: languageList,

  init(...args) {
    this._super(...args);

    this.selected = this.selected || [];
    this.set('spdxLicenseListComplete', this.spdx.spdxList);
    this.set('spdxLicenseList', this.spdx.spdxList);
  },

  updateRights(rights) {
    switch (true) {
      case isBlank(rights):
        this.fragment.set('rights', null);
        this.fragment.set('rightsUri', null);
        this.set('isSpdxId', false);
        break;
      case typeOf(rights) === 'string':
        this.fragment.set('rights', rights);
        this.fragment.set('rightsUri', null);
        this.set('isSpdxId', false);
        break;
      default:
        this.fragment.set('rights', rights.name);
        this.fragment.set('rightsUri', rights.seeAlso[0]);
        this.set('isSpdxId', true);
        break;
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
          this.spdxLicenseList.push(select.searchText);
          select.actions.choose(select.searchText);
          this.updateRights(select.searchText);
          this.set('spdxLicenseList', this.spdxLicenseListComplete);
        }
      }
    },
    selectRights(value) {
      this.updateRights(value);
    },
    updateRightsUri(value) {
      this.fragment.set('rightsUri', value);
    },
    deleteRights() {
      this.model.get('rightsList').removeObject(this.fragment);
    },
    searchRights(query) {
      let rightsFound = this.spdxLicenseListComplete.filter(function (rights) {
        return rights.name.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('spdxLicenseList', rightsFound);
    },
    searchLanguage(query) {
      let languages = languageList.filter(function(language) {
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
    },
  }
});
