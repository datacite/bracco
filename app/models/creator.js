import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { A } from '@ember/array';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true
      // disabled: computed('model.state', function() {
      //   return this.model.get('state') === 'draft';
      // }),
    })
  ]
});

@classic
export default class Creator extends Fragment.extend(Validations) {
  @attr('string')
  name;

  @attr('string', { defaultValue: null })
  givenName;

  @attr('string', { defaultValue: null })
  familyName;

  @attr('string', { defaultValue: null })
  nameType;

  @fragmentArray('name-identifier')
  nameIdentifiers;

  @fragmentArray('affiliation')
  affiliation;

  @computed('name', 'givenName', 'familyName')
  get displayName() {
    return this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  }

  @computed('nameIdentifiers')
  get orcid() {
    if (this.nameIdentifiers) {
      let id = A(this.nameIdentifiers).findBy('nameIdentifierScheme', 'ORCID');
      if (id && id.nameIdentifier) {
        return id.nameIdentifier.substr(id.nameIdentifier.indexOf('0'));
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
