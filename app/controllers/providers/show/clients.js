import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'software', 'sort', 'page', 'size'],
  query: null,
  year: null,
  software: null,
  sort: null,
  page: 1,
  size: 25
});
