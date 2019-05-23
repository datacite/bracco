import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   'email': [
//     validator('presence', {
//       presence: true,
//       allowBlank: true
//     }),
//     validator('format', {
//       type: 'email',
//       allowNonTld: true,
//       message: 'Please enter a valid email address.'
//     })
//   ],
//   'givenName': validator('presence', {
//     presence: true,
//     allowBlank: true
//   }),
//   'familyName': validator('presence', {
//     presence: true,
//     allowBlank: true
//   })
// }, {
//   isWarning: true
// });

export default Fragment.extend({
  email : attr('string'),
  givenName : attr('string'),
  familyName  : attr('string')
});
