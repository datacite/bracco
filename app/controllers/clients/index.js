import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'client-type', 'software', 'include-deleted', 'sort', 'page', 'size'],
  query: null,
  year: null,
  'provider-id': null,
  'client-type': null,
  software: null,
  'include-deleted': null,
  sort: null,
  page: 1,
  size: 25
});
