import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'title': [
    validator('presence', {
      presence: true,
    }),
  ],
});

export default Fragment.extend(Validations, {
  name: DS.attr('string'),
  affiliationIdentifier: DS.attr('string', { defaultValue: null }),
  affiliationIdentifierScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null }),
});
