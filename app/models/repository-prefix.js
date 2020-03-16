import DS from 'ember-data';

export default DS.Model.extend({
  repository: DS.belongsTo('repository', {
    async: true,
  }),
  'provider-prefix': DS.belongsTo('provider-prefix', {
    async: true,
  }),
  prefix: DS.belongsTo('prefix', {
    async: true,
  }),

  createdAt: DS.attr('date'),
});
