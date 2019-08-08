import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { computed } from '@ember/object';
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
  familyName  : attr('string'),

  name: computed('givenName', 'familyName', function () {
    let name = null;
    if (this.givenName || this.familyName) {
      name = [this.givenName, this.familyName].join(" ");
    }
    return name;
  }),
});
