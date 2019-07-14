import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray, array } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

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
  affiliation: fragmentArray('affiliation')
});
