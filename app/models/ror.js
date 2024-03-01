import Model, { attr } from '@ember-data/model';

export default Model.extend({
  meta: attr(),

  rorId: attr('string'),
  name: attr('string'),
  local: attr('string'),
  types: attr(),
  links: attr(),
  aliases: attr(),
  acronyms: attr(),
  external_ids: attr(),
  wikipediaUrl: attr('string'),
  labels: attr(),
  country: attr()
});
