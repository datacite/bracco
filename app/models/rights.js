import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  rights: DS.attr('string'),
  rightsUri: DS.attr('string'),
});
