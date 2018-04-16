import DS from 'ember-data';

export default DS.Model.extend({
  providers: DS.hasMany('provider', {
    async: false
  }),
  clients: DS.hasMany('client', {
    async: false
  }),

  meta: DS.attr(),

  created: DS.attr('date')
});
