import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  name: attr('string'),
  givenName: attr('string'),
  familyName: attr('string'),
  nameType: attr('string'),
  affiliation: attr('string')
});
