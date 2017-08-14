import DS from 'ember-data';

export default DS.Model.extend({
  member: DS.belongsTo('member'),
  
  givenNames: DS.attr('string'),
  familyName: DS.attr('string'),
  creditName: DS.attr('string'),
  orcid: DS.attr('string'),
  github: DS.attr('string'),
  role: DS.attr('string'),
  email: DS.attr('string'),
  created: DS.attr('date'),
  updated: DS.attr('date')
});
