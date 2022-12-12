import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      message: 'Related Item contributor must have a name',
    }),
  ],
  contributorType: [
    validator('presence', {
      presence: true,
      message: 'Contributors must include a contributor type',
    }),
    validator('contributor-type', {
    })
  ]
});

export default Fragment.extend(Validations, {
  name: attr('string'),
  contributorType: attr('string', { defaultValue: null }),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: null }),

  displayName: computed('name', 'givenName', 'familyName', function () {
    return this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  }),
});
