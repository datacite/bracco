import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      message: 'Related Item contributor must have a name',
      disabled: computed('model.{name,state}', function () {
        return this.model.get('state') === 'draft';
      })
    })
  ],
  contributorType: [
    validator('presence', {
      presence: true,
      message: 'Contributors must include a contributor type',
      disabled: computed('model.{name,state}', function () {
        return (
          this.model.get('state') === 'draft' || this.model.get('name') === null
        );
      })
    })
  ]
});

export default class RelatedItemContributor extends Fragment.extend(Validations) {
  @attr('string')
  name;

  @attr('string', { defaultValue: 'Other' })
  contributorType;

  @attr('string', { defaultValue: null })
  givenName;

  @attr('string', { defaultValue: null })
  familyName;

  @attr('string', { defaultValue: null })
  nameType;
}
