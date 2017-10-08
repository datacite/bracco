import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['provider-id', 'client-id'],
  'provider-id': null,
  'client-id': null
});
