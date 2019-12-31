import Model, { attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null })
});