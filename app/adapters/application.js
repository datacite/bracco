import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'bracco/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.API_URL,
  currentUser: Ember.inject.service(),

  // headers: Ember.computed('currentUser.jwt', function() {
  //   var jwt = this.get('currentUser').get('jwt');
  //   return {
  //     "Authorization": "Bearer " + jwt
  //   };
  // })
  // urlForFindRecord(query, modelName, snapshot) {
  //   var url = this._super(...arguments);
  //
  //   return this._processIncludes(url, snapshot);
  // },
  //
  // urlForFindAll(query, modelName, snapshot) {
  //   var url = this._super(...arguments);
  //
  //   return this._processIncludes(url, snapshot);
  // },
  //
  // urlForFindPaged(query, modelName, snapshot) {
  //   var url = this._super(...arguments);
  //
  //   return this._processIncludes(url, snapshot);
  // },
  //
  // _processIncludes(url, snapshot) {
  //   var options = snapshot && snapshot.adapterOptions;
  //
  //   if (options && options.include) {
  //     url = `${url}?include=${options.include}`;
  //   }
  //
  //   return url;
  // }
});
