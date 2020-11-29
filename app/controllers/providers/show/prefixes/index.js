import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    'query',
    'client-id',
    'consortium-organization-id',
    'year',
    'state',
    'sort',
    'page',
    'size'
  ],
  query: null,
  'client-id': null,
  'consortium-organization-id': null,
  year: null,
  state: null,
  sort: null,
  page: 1,
  size: 25
});
