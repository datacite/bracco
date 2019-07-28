import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'provider-id', 'page', 'size'],
  query: null,
  'provider-id': null,
  page: 1,
  size: 25
});
