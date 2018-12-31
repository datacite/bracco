import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'person-id', 'prefix', 'year', 'created', 'registered', 'state', 'sort', 'source', 'link-check-status', 'schema-version', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  'person-id': null,
  prefix: null,
  year: null,
  created: null,
  registered: null,
  state: null,
  source: null,
  'link-check-status': null,
  sort: null,
  'schema-version': null
});
