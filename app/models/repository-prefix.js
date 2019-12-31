import Model, { belongsTo, attr } from '@ember-data/model';

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

  created: attr('date')
});
