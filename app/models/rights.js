import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
// import { computed } from '@ember/object';

const Validations = buildValidations({
  rightsUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.',
    }),
  ],
  schemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.',
    }),
  ],
});

export default Fragment.extend(Validations, {
  rights: DS.attr('string'),
  rightsUri: DS.attr('string'),
  rightsIdentifier: DS.attr('string'),
  rightsIdentifierScheme: DS.attr('string'),
  schemeUri: DS.attr('string'),
});
