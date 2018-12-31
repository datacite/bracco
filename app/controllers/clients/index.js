import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'software', 'include-deleted', 'sort', 'page', 'perPage'],
  query: null,
  year: null,
  'provider-id': null,
  software: null,
  'include-deleted': null,
  sort: null
});
