import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
// import { computed } from '@ember/object';

const Validations = buildValidations({
  rightsUri: [
    validator('url-format', {
      allowBlank: true,
      protocols: ['http', 'https', 'ftp'],
      message: 'Rights scheme URI has to be a valid URI'
      // disable url check for info URI
      // disabled: computed('fragment.rightsUri', function() {
      //   return this.fragment.get('rightsUri').startsWith('info:');
      // }),
    })
  ]
  // schemeUri: [
  //   validator('url-format', {
  //     allowBlank: true,
  //     require_tld: false,
  //     message: 'Please enter a valid URL.',
  //   }),
  // ],
});

export default Fragment.extend(Validations, {
  rights: attr('string'),
  rightsUri: attr('string'),
  lang: attr('string', { defaultValue: null })
  // // Not implemented yet in the REST API
  // rightsIdentifier: attr('string'),
  // rightsIdentifierScheme: attr('string'),
  // schemeUri: attr('string'),
});
