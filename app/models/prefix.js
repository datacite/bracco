import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  providers: hasMany('provider', {
    async: true
  }),
  repositories: hasMany('repository', {
    async: true
  }),
  'provider-prefixes': hasMany('provider-prefix', {
    async: true
  }),
  'repository-prefixes': hasMany('repository-prefix', {
    async: true
  }),

  meta: attr(),
  createdAt: attr('date')
});
