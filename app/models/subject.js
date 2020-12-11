import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  subject: [
    validator('presence', {
      presence: true
    })
  ],
  subjectSchemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.'
    })
  ]
});

export default MF.Fragment.extend(Validations, {
  subject: attr('string'),
  subjectScheme: attr('string', { defaultValue: null }),
  schemeUri: attr('string', { defaultValue: null }),
  valueUri: attr('string', { defaultValue: null }),

  subjectSchemeUri: computed('valueUri', function () {
    return this.valueUri || '';
  })
});
