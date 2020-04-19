import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      // disabled: computed('model.state', function() {
      //   return this.model.get('state') === 'draft';
      // }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  name: DS.attr('string'),
  givenName: DS.attr('string', { defaultValue: null }),
  familyName: DS.attr('string', { defaultValue: null }),
  nameType: DS.attr('string', { defaultValue: null }),
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
