import DS from 'ember-data';

export default DS.Model.extend({
  providers: DS.hasMany('provider', {
    async: true,
  }),
  repositories: DS.hasMany('repository', {
    async: true,
  }),
  'provider-prefixes': DS.hasMany('provider-prefix', {
    async: true,
  }),
  'repository-prefixes': DS.hasMany('repository-prefix', {
    async: true,
  }),

  meta: DS.attr(),

  createdAt: DS.attr('date'),
});
