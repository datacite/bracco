import Model, { attr } from '@ember-data/model';

export default Model.extend({
  meta: attr(),

  funderId: attr('string'),
  name: attr('string'),
  uri: attr('string'),
  location: attr('string'),
});
