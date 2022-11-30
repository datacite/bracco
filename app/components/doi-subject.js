import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import fosMapping from '../utils/fos-mappings';

const completeSubjectList = fosMapping.allLabels();

export default Component.extend({
  completeSubjectList,
  subjects: completeSubjectList,
  oecdSelected: false,

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
        this.fragment.set('subject', 'FOS: ' + fos.subject);
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
    }
  }
});
