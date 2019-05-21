import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'email': [
    validator('presence', true),
    validator('format', {
      type: 'email',
      allowNonTld: true,
      message: 'Please enter a valid email address.'
    })
  ],
  'givenName': validator('presence', true),
  'familyName': validator('presence', true)
});

export default Fragment.extend(Validations, {
  email : attr('string'),
  givenName : attr('string'),
  familyName  : attr('string')
});
