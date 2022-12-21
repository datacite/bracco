import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  formatExtension: attr('string', { defaultValue: 'TEST EXTENSTION' }),
  formatType: attr('string', { defaultValue: 'TEST TYPE' }),
  // affiliationIdentifierScheme: attr('string', { defaultValue: null }),
  // schemeUri: attr('string', { defaultValue: null })
});
