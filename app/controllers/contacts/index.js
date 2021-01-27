import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    'query',
    'role',
    'provider-id',
    'include-deleted',
    'sort',
    'page',
    'size'
  ],
  query: null,
  role: null,
  'provider-id': null,
  'include-deleted': null,
  sort: null,
  page: 1,
  size: 25
});
