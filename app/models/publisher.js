import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  name: attr('string', { defaultValue: null }),
  lang: attr('string', { defaultValue: null }),
  publisherIdentifier: attr('string', { defaultValue: null }),
  publisherIdentifierScheme: attr('string', { defaultValue: null }),
  schemeUri: attr('string', { defaultValue: null })
});
