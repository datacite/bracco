import Ember from 'ember';
import ENV from 'bracco/config/environment';
import fetch from 'fetch';

export default Ember.Component.extend({
  data: null,

  didInsertElement: function() {
    let self = this;
    let url = ENV.CDN_URL + "/data/links.json"
    let result = fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });

    result.then(function(data) {
      if (ENV.environment === 'development') {
        data.header_links = data.development_links;
      } else if (ENV.environment === 'stage') {
        data.header_links = data.stage_links;
      } else {
        data.header_links = data.production_links;
      }
      self.set('data', data);
    });

  }
});
