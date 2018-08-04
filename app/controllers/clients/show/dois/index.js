import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'provider-id', 'client-id', 'person-id', 'prefix', 'year', 'state', 'sort', 'created', 'schema-version', 'source', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  'person-id': null,
  prefix: null,
  year: null,
  created: null,
  state: null,
  source: null,
  sort: null,
  'schema-version': null
});
