import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row'],

  didInsertElement: function() {
    let self = this;
    let url = ENV.DATA_URL + '/' + this.get('doi');

    let result = fetch(url, {
      headers: {
        'Accept': 'application/vnd.datacite.datacite+xml'
      }
    }).then(function(response) {
      return response.blob();
    }).catch(function(err) {
      // Error :(
    });

    result.then(function(result) {
      let reader = new FileReader();
      reader.onloadend = function() {
        self.set('output', reader.result);
      }
      reader.readAsText(result);
    });
  }
});
