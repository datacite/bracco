import Model, { attr } from '@ember-data/model';

export default class Funder extends Model {
  @attr()
  meta;

  @attr('string')
  name;

  @attr('array')
  altNames;

  @attr('string')
  location;
}
