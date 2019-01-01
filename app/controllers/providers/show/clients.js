import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'provider-id', 'software', 'sort', 'page', 'size'],
  query: null,
  year: null,
  'provider-id': null,
  software: null,
  sort: null,
  page: 1,
  size: 25
});
