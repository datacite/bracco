import DS from 'ember-data';

export default DS.Model.extend({
  client: DS.belongsTo('user', {
    async: false
  }),
  provider: DS.belongsTo('provider', {
    async: false
  }),
  prefix: DS.belongsTo('client', {
    async: false
  }),

  created: DS.attr('date')
});
