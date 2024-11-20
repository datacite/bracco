import Model, { attr } from '@ember-data/model';

export default class Ror extends Model {
  @attr()
  meta;

  @attr('string')
  rorId;

  @attr('string')
  name;

  @attr('string')
  local;

  @attr()
  types;

  @attr()
  links;

  @attr()
  aliases;

  @attr()
  acronyms;

  @attr()
  external_ids;

  @attr('string')
  wikipediaUrl;

  @attr()
  labels;

  @attr()
  country;
}
