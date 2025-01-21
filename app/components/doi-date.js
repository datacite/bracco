// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

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

export default class DoiDate extends Component {
  dateTypesCompleteList = dateTypesCompleteList;
  dateTypesList = dateTypesCompleteList;

  constructor(...args) {
    super(...args);

    this.dateTypes = this.dateTypes || [];
  }

  @action
  updateDate(value) {
    this.fragment.date = value;
  }

  @action
  selectDateType(value) {
    this.fragment.dateType = value;
    this.dateType = this.dateTypesCompleteList;
  }

  @action
  updateDateInformation(value) {
    this.fragment.dateInformation = value;
  }

  @action
  deleteDate() {
    this.model.dates.removeObject(this.fragment);
  }
}
