import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'title': [
    validator('presence', { 
      presence: true,
      isWarning: computed('model._internalModel._recordData.getOwner()', function () {
        // workaround to look up owner
        let owner = this.model._internalModel._recordData.getOwner();
        return owner.state === 'draft' || owner.prefix === '10.5072';
      }),
      disabled: computed('model._internalModel._recordData.getOwner()', function () {
        let owner = this.model._internalModel._recordData.getOwner();
        return this.model !== owner.titles.content[0];
      })
    })
  ]
});

export default Fragment.extend(Validations, {
  name: DS.attr('string'),
  affiliationIdentifier: DS.attr('string', { defaultValue: null }),
  affiliationIdentifierScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null })
});
