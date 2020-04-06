import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  givenName: [
    validator('presence', {
      presence: true,
      message: 'Contributors with nameType Personal must include a Give Name',
      disabled: computed('model.nameType', 'model.name', function() {
        // only validate if nameType is "Personal"
        return this.model.get('nameType') !== 'Personal' || this.model.get('name') == '';
      }),
    }),
  ],
  familyName: [
    validator('presence', {
      presence: true,
      message: 'Contributors with nameType Personal must include a Family Name',
      disabled: computed('model.nameType', 'model.name', function() {
        // only validate if nameType is "Personal"
        return this.model.get('nameType') !== 'Personal' || this.model.get('name') == '';
      }),
    }),
  ],
  contributorType: [
    validator('presence', {
      presence: true,
      message: 'Contributors must include a Contributor Type',
      isWarning: computed('model.state', function() {
        return this.get('model.state') === 'draft';
      }),
      disabled: computed('model.name', function() {
        return isBlank(this.model.get('name'));
      }),
    }),
    validator('contributor-type', {
      isWarning: computed('model.state', function() {
        return this.get('model.state') === 'draft';
      }),
      disabled: computed('model.name', function() {
        return isBlank(this.model.get('name'));
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations,{
  name: DS.attr('string'),
  contributorType: DS.attr('string', { defaultValue: null }),
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
