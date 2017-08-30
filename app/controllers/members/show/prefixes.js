import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'data-center-id', 'year', 'page', 'perPage'],
  query: null,
  'data-center-id': null,
  'year': null
});
