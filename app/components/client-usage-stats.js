import Ember from 'ember';
import fetch from 'fetch';
const { service } = Ember.inject;
import { oneWay } from '@ember/object/computed';
import ENV from 'bracco/config/environment';
  
export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  usageViews: null,
  usageDownloads: null,
  showViews: oneWay('usageViews'),
  showDownloads: oneWay('usageDownloads'),

  didReceiveAttrs() {
    this._super(...arguments);

    this.fetchUsage();
  },

  fetchUsage() {
    let self = this;
    this.get('store').query('prefix', { 'client-id': this.get('model.id'), sort: 'name', 'page[size]': 25 }).then(function(prefixes) {
      prefixes = prefixes.mapBy('id').removeObject('10.5072').join(',')
      let url = ENV.EVENTDATA_URL + '/events?prefix=' + prefixes;

      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + self.get('currentUser').get('jwt'),
          'Accept': 'application/vnd.api+json'
        }
      }).then(function(response) {
        if (response.ok) {
          return response.json().then(function(data) {
            if (data.errors) {
              let message = data.errors[0].title;
              return message;
            } else {
              let usageViews = data.meta['relation-types'] && data.meta['relation-types'].findBy('id', 'total-dataset-investigations-regular');
              let usageDownloads = data.meta['relation-types'] && data.meta['relation-types'].findBy('id', 'total-dataset-requests-regular');
  
              if (usageViews) {
                self.set('usageViews', usageViews['year-months']);
              }
              if (usageDownloads) {
                self.set('usageDownloads', usageDownloads['year-months']);
              }
            }
          });
        } else {
          Ember.Logger.assert(false, response);
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error);
      });
    }).catch(function(error){
      Ember.Logger.assert(false, error);
    });
  }
});
