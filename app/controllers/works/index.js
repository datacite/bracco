import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'member-id', 'data-center-id', 'year', 'schema-version', 'page', 'perPage'],
  query: null,
  'resource-type-id': null,
  'member-id': null,
  'data-center-id': null,
  year: null,
  'schema-version': null
});
