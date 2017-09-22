import DS from 'ember-data';

export default DS.Model.extend({
  providers: DS.hasMany('provider', {
    async: false
  }),
  clients: DS.hasMany('client', {
    async: false
  }),

  created: DS.attr('date')
});
