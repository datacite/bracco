import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
import Fragment from 'ember-data-model-fragments/fragment';

const Validations = buildValidations({
  email: [
    validator('email-format', {
      allowBlank: true
    })
  ]
});

export default class ContactFragment extends Fragment.extend(Validations) {
  @attr('string')
  email;

  @attr('string')
  givenName;

  @attr('string')
  familyName;

  @computed('givenName', 'familyName')
  get name() {
    let name = null;
    if (this.givenName || this.familyName) {
      name = [this.givenName, this.familyName].join(' ');
    }
    return name;
  }

  @computed('name', 'email')
  get displayName() {
    if (this.name) {
      return this.name.trim();
    } else {
      return this.email;
    }
  }
}
