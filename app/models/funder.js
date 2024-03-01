import Model, { attr } from '@ember-data/model';

export default Model.extend({
  meta: attr(),

  name: attr('string'),
  altNames: attr('array'),
  location: attr('string')
});
