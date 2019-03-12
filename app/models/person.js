import DS from 'ember-data';

export default DS.Model.extend({
  meta: DS.attr(),
  
  identifier: DS.attr('string'),
  creditName: DS.attr('string'),
  givenNames: DS.attr('string', { defaultValue: null }),
  familyName: DS.attr('string', { defaultValue: null })
});