import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  issnl: DS.attr('string'),
  electronic: DS.attr('string'),
  print: DS.attr('string')
});
