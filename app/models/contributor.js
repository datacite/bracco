import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true
      // disabled: computed('model.state', function() {
      //   return this.model.get('state') === 'draft';
      // }),
    })
  ],
  contributorType: [
    validator('presence', {
      presence: true,
      message: 'Contributors must include a contributor type',
      disabled: computed('model.name', function () {
        return isBlank(this.model.get('name'));
      })
    }),
    validator('contributor-type', {
      disabled: computed('model.name', function () {
        return isBlank(this.model.get('name'));
      })
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  name: attr('string'),
  contributorType: attr('string', { defaultValue: null }),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: null }),
  nameIdentifiers: MF.fragmentArray('name-identifier'),
  affiliation: MF.fragmentArray('affiliation'),

  displayName: computed('name', 'givenName', 'familyName', function () {
    return this.familyName
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
        return id.nameIdentifier.substr(id.nameIdentifier.indexOf('0'));
      } else {
        return null;
      }
    } else {
      return null;
    }
  })
});
