import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import fosMapping from '../utils/fos-mappings';
import { computed } from '@ember/object';
import ISO6391 from 'iso-639-1';

const completeSubjectList = fosMapping.allLabels();
const languageList = ISO6391.getAllNames();

export default Component.extend({
  attributeBindings: ['simple'],
  completeSubjectList,
  subjects: completeSubjectList,
  oecdSelected: false,
  languageList,
  languages: languageList,
  language: computed('fragment.lang', function() {
    return ISO6391.getName(this.get('fragment.lang')) !== '' ? ISO6391.getName(this.get('fragment.lang')) : this.get('fragment.lang');
  }),

  init(...args) {
    this._super(...args);
    this.selected = this.selected || [];
  },

  setSchemeUri(value) {
    this.fragment.set('subjectSchemeUri', value);
    this.fragment.set('schemeUri', value);
    this.set('schemeUri', value);
  },
  setScheme(value) {
    this.fragment.set('subjectScheme', value);
    this.set('subjectScheme', value);
  },
  setClassificationCode(value) {
    this.fragment.set('classificationCode', value);
    this.set('classificationCode', value);
  },
  didReceiveAttrs() {
    this._super(...arguments);

    if (
      this.fragment.get('subject') &&
      completeSubjectList.includes(
        this.fragment.get('subject').replace('FOS: ', '')
      )
    ) {
      this.set('oecdSelected', true);
    } else {
      this.set('oecdSelected', false);
    }
  },
  subjectText(value){
    if (this.simple) {
      return value;
    }
    return "FOS: " + value;
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
          this.subjects.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('subject', select.searchText);
          this.set('subjects', completeSubjectList);
        }
      }
    },
    updateSubject(value) {
      var fos = fosMapping.findSubjectByLabel(value);
      if (fos) {
        this.fragment.set('subject', this.subjectText(fos.subject));
        this.setScheme(fos.subjectScheme);
        this.setSchemeUri(fos.schemeUri);
        this.setClassificationCode(fos.classificationCode);
        this.set('oecdSelected', true);
      } else {
        this.fragment.set('subject', value);
        this.setScheme(null);
        this.set('schemeUri', null);
        this.fragment.set('subjectSchemeUri', null);
        this.setClassificationCode(null);
        this.set('oecdSelected', false);
      }
    },
    updateSubjectScheme(value) {
      this.fragment.set('subjectScheme', value);
    },
    updateSubjectSchemeUri(value) {
      this.setSchemeUri(value);
    },
    updateClassificationCode(value) {
      this.setClassificationCode(value);
    },
    deleteSubject() {
      this.model.get('subjects').removeObject(this.fragment);
    },
    searchSubject(query) {
      let subjects = completeSubjectList.filter(function (subject) {
        return subject.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('subjects', subjects);
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
