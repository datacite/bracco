import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider'),
  client: DS.belongsTo('client'),
  role: DS.belongsTo('role'),

  givenNames: DS.attr('string'),
  familyName: DS.attr('string'),
  creditName: DS.attr('string'),
  orcid: DS.attr('string'),
  github: DS.attr('string'),
  email: DS.attr('string'),
  created: DS.attr('date'),
  updated: DS.attr('date')
});
