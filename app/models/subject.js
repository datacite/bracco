import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
// import { A } from '@ember/array';

const Validations = buildValidations({
  subject: validator('presence', true),
  subjectSchemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.',
    }),
    // validator('presence', {
    //   presence: true,
    //   isWarning: computed('model.state', function() {
    //     return this.model.get('state') === 'draft';
    //   }),
    // }),
  ],
});

export default MF.Fragment.extend(Validations, {
  subject: DS.attr('string'),
  subjectScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null }),
  valueUri: DS.attr('string', { defaultValue: null }),

  subjectSchemeUri: computed('schemeUri', 'valueUri', function() {
    return (this.schemeUri || '').concat(this.schemeUri || '');
  }),
});


