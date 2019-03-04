import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  description: attr('string'),
  descriptionType: attr('string', { defaultValue: "Abstract" }),
  lang: attr('string', { defaultValue: null })
});
