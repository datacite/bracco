import Component from '@ember/component';
import ISO6391 from 'iso-639-1';
import URI from 'urijs';
import { isBlank } from '@ember/utils';
// import OECD from 'helpers/oecd-list';

const subjectList = [
  'Pure mathematics',
  'Applied mathematics',
  'Statistics and probability',
  'Computer sciences, information science and bioinformatics',
  'Atomic, molecular and chemical physics',
  'Condensed matter physics',
  'Particles and fields physics',
  'Nuclear physics', 'Fluids and plasma physics',
  'Optics',
  'Acoustics',
  'Astronomy',
  'Organic chemistry',
  'Inorganic and nuclear chemistry',
  'Physical chemistry',
  'Polymer science',
  'Electrochemistry',
  'Colloid chemistry',
  'Analytical chemistry',
  'Geosciences, multidisciplinary', 'Mineralogy','Palaeontology','Geochemistry and geophysics',
  'Physical geography',
  'Geology',
  'Volcanology',
  'Environmental sciences',
  'Meteorology and atmospheric sciences',
  'climatic research',
  'Oceanography',
  'Hydrology',
  'Water resources',
];

const oecdScheme = 'OECD';
const oecdSchemeUri = 'http://www.oecd.org/science/inno/38235147.pdf';


export default Component.extend({
  subjectList,
  subjects: subjectList,
  oecdSelected: false,
  selected: [],

  setSchemeUri(value) {
    let uri = URI(value);
    this.fragment.set('subjectSchemeUri', value);
    this.fragment.set('valueUri', uri.segment()[uri.segment().length - 1]);
    this.fragment.set('schemeUri', uri.origin().concat(uri.directory()));
    this.set('schemeUri', value);
  },
  setScheme(value) {
    this.fragment.set('subjectScheme', value);
    this.set('subjectScheme', value);
  },

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        if (!this.selected.includes(select.searchText)) {
          this.subjects.push(select.searchText);
          select.actions.choose(select.searchText);
          this.fragment.set('subject', select.searchText);
          this.set('subjects', subjectList);
        }
      }
    },
    updateSubject(value) {
      this.fragment.set('subject', value);
      if (subjectList.includes(value)) {
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
      let subjects = subjectList.filter(function(subject) {
        return subject.toLowerCase().startsWith(query.toLowerCase());
      });
      this.set('subjects', subjects);
    },
    selectSubject(subject) {
      if (subject) {
        this.fragment.set('subject', ISO6391.getCode(subject));
      } else {
        this.fragment.set('subject', null);

      }
      this.set('subjects', subjectList);
    },
  },
});
