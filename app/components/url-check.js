import Ember from 'ember';
const { service } = Ember.inject;
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  currentUser: service(),

  init() {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.send("checkLink");
    });
  },

  actions: {
    checkLink() {
      let self = this;
      let url = ENV.APP_URL + '/dois/status?id=' + this.get('model').get('doi');
      fetch(url, {
        method: 'post',
        timeout: 5000,
        headers: {
          'Authorization': 'Bearer ' + this.get('currentUser').get('jwt')
        }
      }).then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            if (parseInt(result.status) === 403) {
              self.set('message', "Access to page was forbidden (status code " + result.status + ").");
            } else if (result.status === 404) {
              self.set('message', "Page was not found (status code " + result.status + ").");
            } else if (result.status === 408) {
              self.set('message', "Request timed out reaching the page (status code " + result.status + ").");
            } else if (result.status !== 200) {
              self.set('message', "An error has occured (status code " + result.status + ").");
            } else if (result['content-type'] !== "text/html") {
              self.set('message', "Page should be a web page, but was content type " + result['content-type'] + ".");
            }
          });
        } else {
          Ember.Logger.assert(false, response)
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error)
      });
    }
  },

  didInsertElement() {
    this.set('url', this.get('url'));
  }
});
