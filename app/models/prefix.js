import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
  providers: hasMany('provider', {
    async: false
  }),
  repositories: hasMany('repository', {
    async: false
  }),

  meta: attr(),

  created: attr('date')
});
