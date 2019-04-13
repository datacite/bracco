import DS from 'ember-data';

export default DS.Model.extend({
  meta: DS.attr(),
  
  name: DS.attr('string'),
  local: DS.attr('string'),
  types: DS.attr(),
  links: DS.attr(),
  aliases: DS.attr(),
  acronyms: DS.attr(),
  external_ids: DS.attr(),
  wikipediaUrl: DS.attr('string'),
  labels: DS.attr(),
  country: DS.attr()
});
