import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray, array } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: "Personal" }),
  affiliation: array(),
  nameIdentifiers: fragmentArray('name-identifier')
});
