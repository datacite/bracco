import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  subjectSchemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.',
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  subject: DS.attr('string'),
  subjectScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null }),
  valueUri: DS.attr('string', { defaultValue: null }),

  subjectSchemeUri: computed('valueUri', function() {
    return (this.valueUri || '');
  }),
});


