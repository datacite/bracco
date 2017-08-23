import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-transparent', 'url'],
  url: null,
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
      let url = ENV.DATA_URL + '/' + this.get('model').get("doi") + '?status';
      let result = fetch(url, {
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
          if (result["content-type"] == "text/html") {
            self.set('status', 'ok');
            self.set('buttonType', 'success');
          } else {
            self.set('status', 'failed');
            self.set('buttonType', 'warning');
            self.set('reason', "DOI landing page is not a web page (content type " + result["content-type"] + ").");
          }
        } else if (parseInt(result.status) === 403) {
          self.set('status', 'failed');
          self.set('buttonType', 'warning');
          self.set('reason', "Access to DOI landing page is forbidden (status code " + result.status + ").");
        } else if (result.status === 404) {
          self.set('status', 'failed');
          self.set('buttonType', 'warning');
          self.set('reason', "DOI landing page was not found (status code " + result.status + ").");
        } else {
          self.set('status', 'failed');
          self.set('buttonType', 'warning');
          self.set('reason', "An error has occured (status code " + result.status + ").");
        }
      });
    }
  },

  didInsertElement: function() {
    this.set('url', this.get('model').get("url"));
  }
});
