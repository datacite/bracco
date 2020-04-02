import Component from '@ember/component';

const dateTypesCompleteList = [
  'Accepted',
  'Available',
  'Copyrighted',
  'Collected',
  'Created',
  'Issued',
  'Submitted',
  'Updated',
  'Valid',
  'Withdrawn',
  'Other',
];


export default Component.extend({
  dateTypesCompleteList,
  dateTypesList: dateTypesCompleteList,
  dateTypes: [],

  actions: {
    updateDate(value) {
      this.fragment.set('date', value);
    },
    selectDateType(value) {
      this.fragment.set('dateType', value);
      this.set('dateType', this.dateTypesCompleteList);
    },
    updateDateInformation(value) {
      this.fragment.set('dateInformation', value);
    },
    deleteDate() {
      this.model.get('dates').removeObject(this.fragment);
    },
  },
});
