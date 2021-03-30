import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  subjectSchemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.'
    })
  ]
});

export default Fragment.extend(Validations, {
  subject: attr('string'),
  subjectScheme: attr('string', { defaultValue: null }),
  schemeUri: attr('string', { defaultValue: null }),
  valueUri: attr('string', { defaultValue: null }),
  classificationCode: attr('string', { defaultValue: null }),

  subjectSchemeUri: computed('valueUri', function () {
    return this.valueUri || '';
  })
});
