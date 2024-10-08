import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

const dateTypesCompleteList = [
  'Accepted',
  'Available',
  'Copyrighted',
  'Collected',
  'Coverage',
  'Created',
  'Issued',
  'Submitted',
  'Updated',
  'Valid',
  'Withdrawn',
  'Other'
];

@classic
export default class DoiDate extends Component {
  dateTypesCompleteList = dateTypesCompleteList;
  dateTypesList = dateTypesCompleteList;

  init(...args) {
    super.init(...args);

    this.dateTypes = this.dateTypes || [];
  }

  @action
  updateDate(value) {
    this.fragment.set('date', value);
  }

  @action
  selectDateType(value) {
    this.fragment.set('dateType', value);
    this.set('dateType', this.dateTypesCompleteList);
  }

  @action
  updateDateInformation(value) {
    this.fragment.set('dateInformation', value);
  }

  @action
  deleteDate() {
    this.model.get('dates').removeObject(this.fragment);
  }
}
