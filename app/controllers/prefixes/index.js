import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'member-id', 'data-center-id', 'year', 'page', 'perPage'],
  query: null,
  'member-id': null,
  'data-center-id': null,
  'year': null
});
