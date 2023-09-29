import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
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
    return name.trim();
  }),
  displayName: computed('name', 'email', function () {
    if (this.name) {
      return this.name;
    } else {
      return this.email;
    }
  })
});
