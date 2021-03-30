import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    'query',
    'role-name',
    'include-deleted',
    'sort',
    'page',
    'size'
  ],
  query: null,
  'role-name': null,
  'include-deleted': null,
  sort: null,
  page: 1,
  size: 25
});
