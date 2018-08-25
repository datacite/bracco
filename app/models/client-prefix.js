import DS from 'ember-data';

export default DS.Model.extend({
  client: DS.belongsTo('client', {
    async: true
  }),
  'provider-prefix': DS.belongsTo('provider-prefix', {
    async: true
  }),
  prefix: DS.belongsTo('prefix', {
    async: true
  }),

  created: DS.attr('date')
});
