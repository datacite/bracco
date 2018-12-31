import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'provider-id', 'page', 'perPage'],
  query: null,
  'provider-id': null
});
