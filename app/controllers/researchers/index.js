import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'repository-id', 'sort', 'page', 'size'],
  query: null,
  'provider-id': null,
  'repository-id': null,
  sort: null,
  page: 1,
  size: 25
});
