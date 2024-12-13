// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import fosMapping from '../utils/fos-mappings';
import { tracked } from '@glimmer/tracking';

const completeSubjectList = fosMapping.allLabels().sort();

@attributeBindings('simple')
export default class DoiSubject extends Component {
  completeSubjectList = completeSubjectList;
  subjects = completeSubjectList;
  oecdSelected = false;

  constructor(...args) {
    super(...args);
    this.selected = this.selected || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (
      this.fragment.subject &&
      completeSubjectList.includes(
        this.fragment.subject.replace('FOS: ', '')
      )
    ) {
      this.oecdSelected = true;
    } else {
      this.oecdSelected = false;
    }
  }

  setSchemeUri(value) {
    this.fragment.schemeUri = value;
    this.schemeUri = value;
  }

  setScheme(value) {
    this.fragment.subjectScheme = value;
    this.subjectScheme = value;
  }

  setClassificationCode(value) {
    this.fragment.classificationCode = value;
    this.classificationCode = value;
  }

  subjectText(value) {
    if (this.simple) {
      return value;
    }
    return 'FOS: ' + value;
  }

  @action
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
        this.fragment.subject = select.searchText;
        this.set('subjects', completeSubjectList);
      }
    }
  }

  @action
  updateSubject(value) {
    var fos = fosMapping.findSubjectByLabel(value);
    if (fos) {
      this.fragment.subject = this.subjectText(fos.subject);
      this.setScheme(fos.subjectScheme);
      this.setSchemeUri(fos.schemeUri);
      this.setClassificationCode(fos.classificationCode);
      this.oecdSelected = true;
    } else {
      this.fragment.subject = value;
      this.setScheme(null);
      this.setSchemeUri(null);
      this.setClassificationCode(null);
      this.oecdSelected = false;
    }
  }

  @action
  updateSubjectScheme(value) {
    this.fragment.subjectScheme = value;
  }

  @action
  updateSubjectSchemeUri(value) {
    this.setSchemeUri(value);
  }

  @action
  updateClassificationCode(value) {
    this.setClassificationCode(value);
  }

  @action
  deleteSubject() {
    this.model.subjects.removeObject(this.fragment);
  }

  @action
  searchSubject(query) {
    let subjects = completeSubjectList.filter(function (subject) {
      return subject.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('subjects', subjects);
  }
}
