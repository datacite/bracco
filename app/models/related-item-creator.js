import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      message: 'Related Item creator must have a name'
    })
  ]
});

@classic
export default class RelatedItemCreator extends Fragment.extend(Validations) {
  @attr('string')
  name;

  @attr('string', { defaultValue: null })
  givenName;

  @attr('string', { defaultValue: null })
  familyName;

  @attr('string', { defaultValue: null })
  nameType;

  @computed('name', 'givenName', 'familyName')
  get displayName() {
    return this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  }
}
