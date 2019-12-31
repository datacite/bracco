import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  provider: belongsTo('provider', {
    async: false
  }),
  prefix: belongsTo('repository', {
    async: false
  }),

  created: attr('date')
});
