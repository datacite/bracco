import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  rights: attr('string'),
  rightsUri: attr('string')
});
