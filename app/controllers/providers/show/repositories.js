import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'year', 'repository-type', 'certificate', 'software', 'sort', 'page', 'size'],
  query: null,
  year: null,
  'repository-type': null,
  certificate: null,
  software: null,
  sort: null,
  page: 1,
  size: 25
});
