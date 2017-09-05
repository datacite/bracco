import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'role-id', 'page', 'perPage'],
  query: null,
  'role-id': null
});
