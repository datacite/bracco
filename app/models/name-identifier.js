import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'nameIdentifier': [
    validator('name-identifier', true),
  ],
});

export default Fragment.extend(Validations, {
  nameIdentifier: DS.attr('string'),
  nameIdentifierScheme: DS.attr('string'),
  schemeUri: DS.attr('string'),
});
