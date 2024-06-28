import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import fosMapping from '../utils/fos-mappings';

const completeSubjectList = fosMapping.allLabels();

@classic
@attributeBindings('simple')
export default class DoiSubject extends Component {
  completeSubjectList = completeSubjectList;
  subjects = completeSubjectList;
  oecdSelected = false;

  init(...args) {
    super.init(...args);
    this.selected = this.selected || [];
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

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
  }

  setSchemeUri(value) {
    this.fragment.set('schemeUri', value);
    this.set('schemeUri', value);
  }

  setScheme(value) {
    this.fragment.set('subjectScheme', value);
    this.set('subjectScheme', value);
  }

  setClassificationCode(value) {
    this.fragment.set('classificationCode', value);
    this.set('classificationCode', value);
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
        this.fragment.set('subject', select.searchText);
        this.set('subjects', completeSubjectList);
      }
    }
  }

  @action
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
      this.setSchemeUri(null);
      this.setClassificationCode(null);
      this.set('oecdSelected', false);
    }
  }

  @action
  updateSubjectScheme(value) {
    this.fragment.set('subjectScheme', value);
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
    this.model.get('subjects').removeObject(this.fragment);
  }

  @action
  searchSubject(query) {
    let subjects = completeSubjectList.filter(function (subject) {
      return subject.toLowerCase().startsWith(query.toLowerCase());
    });
    this.set('subjects', subjects);
  }
}
