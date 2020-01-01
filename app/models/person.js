import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  givenName: DS.attr('string', { defaultValue: null }),
  familyName: DS.attr('string', { defaultValue: null }),
});