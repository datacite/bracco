import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
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

export default Fragment.extend(Validations, {
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: null }),
  nameIdentifiers: fragmentArray('name-identifier'),
  affiliation: fragmentArray('affiliation'),

  displayName: computed('name', 'givenName', 'familyName', function () {
    return this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  }),
  orcid: computed('nameIdentifiers', function () {
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
  })
});
