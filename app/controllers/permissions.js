import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'role-id', 'sort', 'page', 'perPage'],
  query: null,
  'role-id': null,
  sort: null
});
