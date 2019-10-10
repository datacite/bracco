import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'person-id', 'affiliation-id', 'prefix', 'year', 'created', 'registered', 'state', 'source', 'link-check-status', 'sort', 'schema-version', 'certificate', 'page', 'size', 'affiliation'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  'person-id': null,
  'affiliation-id': null,
  prefix: null,
  year: null,
  created: null,
  registered: null,
  state: null,
  source: null,
  'link-check-status': null,
  sort: null,
  'schema-version': null,
  certificate: null,
  page: 1,
  size: 25,
  affiliation: true
});
