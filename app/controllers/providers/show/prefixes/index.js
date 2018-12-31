import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'client-id', 'year', 'state', 'sort', 'page', 'perPage'],
  query: null,
  'client-id': null,
  year: null,
  state: null,
  sort: null
});
