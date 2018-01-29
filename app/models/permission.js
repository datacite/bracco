import DS from 'ember-data';

export default DS.Model.extend({
  provider: DS.belongsTo('provider', {
    async: false
  }),
  prefix: DS.belongsTo('client', {
    async: false
  }),

  created: DS.attr('date')
});
