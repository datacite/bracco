import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.USER_API_URL
  //currentUser: Ember.inject.service(),

  // headers: Ember.computed('currentUser.jwt', function() {
  //   let jwt = this.get('currentUser').get('jwt');
  //   return {
  //     "Authorization": "Bearer " + jwt
  //   };
  // })
});
