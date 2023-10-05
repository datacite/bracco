import{ attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import Fragment from 'ember-data-model-fragments/fragment';

const Validations = buildValidations({
  email: [
    validator('email-format', {
      allowBlank: true
    })
  ]
});

export default Fragment.extend(Validations, {
  email: attr('string'),
  givenName: attr('string'),
  familyName: attr('string'),

  name: computed('givenName', 'familyName', function () {
    let name = null;
    if (this.givenName || this.familyName) {
      name = [this.givenName, this.familyName].join(' ');
    }
    return name;
  }),
  displayName: computed('name', 'email', function () {
    if (this.name) {
      return this.name.trim();
    } else {
      return this.email;
    }
  })
});
