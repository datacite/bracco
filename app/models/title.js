import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('presence', {
      presence: true
    })
  ]
});

export default class Title extends Fragment.extend(Validations) {
  @attr('string', { defaultValue: null })
  title;

  @attr('string', { defaultValue: null })
  titleType;

  @attr('string', { defaultValue: null })
  lang;
}
