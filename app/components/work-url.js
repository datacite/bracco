import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['panel', 'panel-transparent', 'url'],
  url: null,
  status: "working …",
  buttonType: "primary",

  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.send("checkLink");
    });
  },

  actions: {
    checkLink() {
      let self = this;
      let url = this.get('model').get("identifier");
      let result = fetch(url, {
      	method: 'head',
        timeout: 5000
      }).then(function(response) {
        if (response.ok) {
          self.set('status', 'ok');
          self.set('buttonType', 'success');
        } else {
          console.log(response)
          self.set('status', 'failed');
          self.set('buttonType', 'warning');
        }
      }).catch(function(error) {
        console.log(error)
        self.set('status', 'failed');
        self.set('buttonType', 'warning');
      });
    }
  },

  didInsertElement: function() {
    this.set('url', this.get('model').get("url"));
  }
});
