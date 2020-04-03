import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  identifierType: [
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.identifier', function() {
        return this.model.get('identifier') == null;
      }),
    }),
  ],
});

export default Fragment.extend(Validations, {
  identifier: DS.attr('string', { defaultValue: null }),
  identifierType: DS.attr('string', { defaultValue: null }),
});
