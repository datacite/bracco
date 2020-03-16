import DS from 'ember-data';

export default DS.Model.extend({
  providers: DS.hasMany('provider', {
    async: false,
  }),
  repositories: DS.hasMany('repository', {
    async: false,
  }),

  meta: DS.attr(),

  createdAt: DS.attr('date'),
});
