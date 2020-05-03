import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  alternateIdentifierType: [
    validator('presence', {
      presence: true,
      message: 'Alternate Identifier must include Identifier Type',
      disabled: computed('model.identifier', function() {
        return isBlank(this.model.get('identifier'));
      }),
    }),
  ],
});

export default Fragment.extend(Validations, {
  alternateIdentifier: DS.attr('string', { defaultValue: null }),
  alternateIdentifierType: DS.attr('string', { defaultValue: null }),
});
