import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  title: attr('string', { defaultValue: null }),
  titleType: attr('string', { defaultValue: null }),
  lang: attr('string', { defaultValue: null })
});
