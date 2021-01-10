import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  repository: belongsTo('repository', {
    async: true
  }),
  'provider-prefix': belongsTo('provider-prefix', {
    async: true
  }),
  prefix: belongsTo('prefix', {
    async: true
  }),

  createdAt: attr('date')
});
