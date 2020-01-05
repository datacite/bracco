import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  name: DS.attr('string'),
  affiliationIdentifier: DS.attr('string', { defaultValue: null }),
  affiliationIdentifierScheme: DS.attr('string', { defaultValue: null }),
  schemeUri: DS.attr('string', { defaultValue: null }),
});
