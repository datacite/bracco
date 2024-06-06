import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  dateType: [
    validator('presence', {
      presence: true,
      message: 'Date type must be included when adding a Date',
      disabled: computed('model.date', function () {
        return this.model.get('date') == null;
      })
    })
  ],
  date: [
    validator('date-format', {
      allowBlank: true,
      disabled: computed('model.state', function () {
        return this.model.get('state') === 'draft';
      })
    })
  ]
});

@classic
export default class Date extends Fragment.extend(Validations) {
  @attr('string')
  date;

  @attr('string')
  dateType;

  @attr('string')
  dateInformation;
}
