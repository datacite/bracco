import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
  url: null,
  urlToCheck: null,
  contentType: "text/html",
  status: "working …",
  buttonType: "primary",
  reason: null,

  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.send("checkLink");
    });
  },

  actions: {
    checkLink() {
      let self = this;
      if (!this.get('urlToCheck')) { this.set('urlToCheck', this.get('url')); }
      let result = fetch(this.get('urlToCheck'), {
        timeout: 5000
      }).then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          Ember.Logger.assert(false, response)

          self.set('status', 'failed');
          self.set('buttonType', 'warning');
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error)

        self.set('status', 'failed');
        self.set('buttonType', 'warning');
      });

      result.then(function(result) {
        // check for appropriate headerss
        if (result.status >= 200 && result.status < 300) {
          if (result["content-type"] == self.get('contentType')) {
            self.set('status', 'ok');
            self.set('buttonType', 'success');
          } else {
            self.set('status', 'failed');
            self.set('buttonType', 'warning');
            if (self.get('contentType') === "text/html") {
              self.set('reason', "Page should be a web page (content type " + result["content-type"] + ").");
            } else {
              self.set('reason', "Page has wrong content type (should be " + self.get('contentType') + ", but was " + result["content-type"] + ").");
            }
          }
        } else {
          self.set('status', 'failed');
          self.set('buttonType', 'warning');

          if (parseInt(result.status) === 403) {
            self.set('reason', "Access to page was forbidden (status code " + result.status + ").");
          } else if (result.status === 404) {
            self.set('reason', "Page was not found (status code " + result.status + ").");
          } else if (result.status === 408) {
            self.set('reason', "Request timed out reaching the page (status code " + result.status + ").");
          } else {
            self.set('reason', "An error has occured (status code " + result.status + ").");
          }
        }
      });
    }
  },

  didInsertElement: function() {
    this.set('url', this.get('url'));
  }
});
