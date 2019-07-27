import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'client-type', 'software', 'sort', 'page', 'size'],
  query: null,
  year: null,
  'client-type': null,
  software: null,
  sort: null,
  page: 1,
  size: 25
});
