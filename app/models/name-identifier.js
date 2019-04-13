import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  nameIdentifier: attr('string'),
  nameIdentifierScheme: attr('string'),
  schemeUri: attr('string')
});
