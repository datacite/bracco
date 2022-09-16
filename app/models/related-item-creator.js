import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      message: 'Related Item creator must have a name'
    })
  ]
});

export default Fragment.extend(Validations, {
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: null }),

  displayName: computed('name', 'givenName', 'familyName', function () {
    return this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  })
});
