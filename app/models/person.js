import Model, { attr } from '@ember-data/model';

export default class Person extends Model {
  @attr('string')
  name;

  @attr('string', { defaultValue: null })
  givenName;

  @attr('string', { defaultValue: null })
  familyName;
}
