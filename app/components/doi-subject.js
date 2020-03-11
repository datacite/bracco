import Component from '@ember/component';
import URI from 'urijs';
import { isBlank } from '@ember/utils';

const completeSubjectList = [
  'Natural sciences',
  'Mathematics',
  'Computer and information sciences',
  'Physical sciences',
  'Chemical sciences',
  'Earth and related Environmental sciences',
  'Biological sciences',
  'Other natural sciences',
  'Engineering and technology',
  'Civil engineering',
  'Electrical engineering, Electronic engineering, Information engineering',
  'Mechanical engineering',
  'Chemical engineering',
  'Materials engineering',
  'Medical engineering',
  'Environmental engineering',
  'Environmental biotechnology',
  'Industrial biotechnology',
  'Nano-technology',
  'Other engineering and technologies',
  'Medical and Health sciences',
  'Basic medicine',
  'Clinical medicine',
  'Health sciences',
  'Medical biotechnology',
  'Other medical sciences',
  'Agricultural sciences',
  'Agriculture, Forestry, and Fisheries',
  'Animal and Dairy science',
  'Veterinary science',
  'Agricultural biotechnology',
  'Other agricultural sciences',
  'Social sciences',
  'Psychology',
  'Economics and Business',
  'Educational sciences',
  'Sociology',
  'Law',
  'Political science',
  'Social and economic geography',
  'Media and communications',
  'Other social sciences',
  'Humanities',
  'History and Archaeology',
  'Languages and Literature',
  'Philosophy, Ethics and Religion',
  'Arts (arts, history of arts, performing arts, music)',
  'Other humanities',
];

const oecdScheme = 'OECD';
const oecdSchemeUri = 'http://www.oecd.org/science/inno/38235147.pdf';

export default Component.extend({
  completeSubjectList,
  subjects: completeSubjectList,
  oecdSelected: false,
  selected: [],

  setSchemeUri(value) {
    let uri = URI(value);
    this.fragment.set('subjectSchemeUri', value);
    this.fragment.set('valueUri', value);
    this.fragment.set('schemeUri', uri.origin().concat(uri.directory()));
    this.set('schemeUri', value);
  },
  setScheme(value) {
    this.fragment.set('subjectScheme', value);
    this.set('subjectScheme', value);
  },
  didReceiveAttrs() {
    this._super(...arguments);

    if (completeSubjectList.includes(this.fragment.get('subject'))) {
      this.set('oecdSelected', true);
    } else {
      this.set('oecdSelected', false);
    }
  },

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        if (!this.selected.includes(select.searchText)) {
          this.subjects.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('subject', select.searchText);
          this.set('subjects', completeSubjectList);
        }
      }
    },
    updateSubject(value) {
      this.fragment.set('subject', value);
      if (completeSubjectList.includes(value)) {
        this.setScheme(oecdScheme);
        this.setSchemeUri(oecdSchemeUri);
        this.set('oecdSelected', true);
      } else {
        this.setScheme(null);
        this.set('schemeUri', null);
        this.fragment.set('subjectSchemeUri', null);
        this.set('oecdSelected', false);
      }
    },
    updateSubjectScheme(value) {
      this.fragment.set('subjectScheme', value);
    },
    updateSubjectSchemeUri(value) {
      this.setSchemeUri(value);
    },
    deleteSubject() {
      this.model.get('subjects').removeObject(this.fragment);
    },
    searchSubject(query) {
      let subjects = completeSubjectList.filter(function(subject) {
        return subject.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('subjects', subjects);
    },
  },
});
