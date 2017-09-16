import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider', {
    async: false
  }),
  prefix: DS.belongsTo('prefix', {
    async: false
  }),
  clients: DS.hasMany('client', {
    async: false
  }),

  created: DS.attr('date')
});
