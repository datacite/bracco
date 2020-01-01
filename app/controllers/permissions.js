import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'query', 'role-id', 'sort', 'page', 'size' ],
  query: null,
  'role-id': null,
  sort: null,
  page: 1,
  size: 25,
});
