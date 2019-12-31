import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const Validations = buildValidations({
  'name': [
    validator('presence', {
      presence: true,
      isWarning: computed('model._internalModel._recordData.getOwner()', function () {
        // workaround to look up owner
        let owner = this.model._internalModel._recordData.getOwner();
        return owner.state === 'draft' || owner.prefix === '10.5072';
      }),
      disabled: computed('model._internalModel._recordData.getOwner()', 'model.nameType', function () {
        // only validate first creator and only if nameType is not "Personal"
        let owner = this.model._internalModel._recordData.getOwner();
        return this.model !== owner.creators.content[0] || this.model.get('nameType') === "Personal";
      })
    })
  ],
  'givenName': [
    validator('presence', {
      presence: true,
      isWarning: computed('model._internalModel._recordData.getOwner()', function () {
        // workaround to look up owner
        let owner = this.model._internalModel._recordData.getOwner();
        return owner.state === 'draft' || owner.prefix === '10.5072';
      }),
      disabled: computed('model._internalModel._recordData.getOwner()', 'model.nameType', function () {
        // only validate first creator and only if nameType is "Personal"
        let owner = this.model._internalModel._recordData.getOwner();
        return this.model !== owner.creators.content[0] || this.model.get('nameType') !== "Personal";
      })
    })
  ],
  'familyName': [
    validator('presence', {
      presence: true,
      isWarning: computed('model._internalModel._recordData.getOwner()', function () {
        // workaround to look up owner
        let owner = this.model._internalModel._recordData.getOwner();
        return owner.state === 'draft' || owner.prefix === '10.5072';
      }),
      disabled: computed('model._internalModel._recordData.getOwner()', 'model.nameType', function () {
        // only validate first creator and only if nameType is "Personal"
        let owner = this.model._internalModel._recordData.getOwner();
        return this.model !== owner.creators.content[0] || this.model.get('nameType') !== "Personal";
      })
    }),
  ],
  'nameIdentifiers': [
    validator('has-many')
  ]
  // 'affiliation': [
  //   validator('has-many')
  // ]
});

export default Fragment.extend(Validations, {
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: "Personal" }),
  nameIdentifiers: fragmentArray('name-identifier'),
  affiliation: fragmentArray('affiliation'),

  displayName: computed('name', 'givenName', 'familyName', function() {
    return (this.familyName) ? [this.givenName, this.familyName].join(" ") : this.name;
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
