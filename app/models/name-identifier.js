import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'nameIdentifier': [
    validator('name-identifier', true)
  ],
});

export default Fragment.extend(Validations, {
  nameIdentifier: attr('string'),
  nameIdentifierScheme: attr('string'),
  schemeUri: attr('string')
});
