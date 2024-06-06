import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';

@classic
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
