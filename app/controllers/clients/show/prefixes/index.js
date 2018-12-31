import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'provider-id', 'client-id', 'year', 'page', 'perPage'],
  query: null,
  'provider-id': null,
  'client-id': null,
  year: null
});
