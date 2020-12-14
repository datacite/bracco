import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: null }),
  nameIdentifiers: MF.fragmentArray('name-identifier'),
  affiliation: MF.fragmentArray('affiliation'),

  displayName: computed('name', 'givenName', 'familyName', function () {
    return this.givenName && this.familyName
      ? [this.givenName, this.familyName].join(' ')
      : this.name;
  }),
  orcid: computed('nameIdentifiers', function () {
    if (this.nameIdentifiers) {
      let id = A(this.nameIdentifiers).findBy('nameIdentifierScheme', 'ORCID');
      if (
        typeof id !== 'undefined' &&
        typeof id.nameIdentifier !== 'undefined'
      ) {
        // ORCID ID could be expressed as ID or URL
        return id.nameIdentifier.substr(id.nameIdentifier.indexOf('0'));
      } else {
        return null;
      }
    } else {
      return null;
    }
  })
});
