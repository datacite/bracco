import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.API_URL,

  headers: Ember.computed('currentUser', function() {
    return {
      "Authorization": "Bearer " + this.get('currentUser').get('jwt')
    };
  })
});
