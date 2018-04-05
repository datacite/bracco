import DS from 'ember-data';

export default DS.Model.extend({
  client: DS.belongsTo('client', {
    async: false
  }),
  'provider-prefix': DS.belongsTo('provider-prefix', {
    async: false
  }),
  prefix: DS.belongsTo('prefix', {
    async: false
  }),

  created: DS.attr('date')
});
