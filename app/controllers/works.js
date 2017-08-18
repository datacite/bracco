import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'resource-type-id', 'member-id', 'data-center-id', 'year', 'schema-version', 'page', 'perPage'],
  query: '',
  'resource-type-id': '',
  'member-id': '',
  'data-center-id': '',
  year: ''
});
