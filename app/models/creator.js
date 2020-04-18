import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
    }),
  ],
  givenName: [
    validator('presence', {
      presence: true,
      message: 'Creators with name type Personal must include a given name',
      disabled: computed('model.nameType', function() {
        // only validate if nameType is "Personal"
        return this.model.get('nameType') !== 'Personal';
      }),
    }),
  ],
  familyName: [
    validator('presence', {
      presence: true,
      message: 'Creators with name type Personal must include a given name',
      disabled: computed('model.nameType', function() {
        // only validate if nameType is "Personal"
        return this.model.get('nameType') !== 'Personal';
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  name: DS.attr('string'),
  givenName: DS.attr('string', { defaultValue: null }),
  familyName: DS.attr('string', { defaultValue: null }),
  nameType: DS.attr('string', { defaultValue: 'Personal' }),
  nameIdentifiers: MF.fragmentArray('name-identifier'),
  affiliation: MF.fragmentArray('affiliation'),

  displayName: computed('name', 'givenName', 'familyName', function() {
    return (this.familyName) ? [ this.givenName, this.familyName ].join(' ') : this.name;
  }),
  orcid: computed('nameIdentifiers', function() {
    if (this.nameIdentifiers) {
      let id = A(this.nameIdentifiers).findBy('nameIdentifierScheme', 'ORCID');
      if (typeof id !== 'undefined' && typeof id.nameIdentifier !== 'undefined') {
        return id.nameIdentifier.substr(id.nameIdentifier.indexOf('0'));
      } else {
        return null;
      }
    } else {
      return null;
    }
  }),
});
