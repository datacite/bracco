import Component from '@ember/component';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { w } from '@ember/string';

export default Component.extend({
  currentUser: service(),

  url: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.fetchURL();
  },

  fetchURL() {
    if (w("crossref.citations medra.citations kisti.citations jalc.citations op.citations").includes(this.model.get('repository.id'))) {
      this.set('url', this.model.get('url'));
    } else {
      let self = this;
      let url = ENV.API_URL + '/dois/' + this.model.get('doi') + '/get-url';

      fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + self.get('currentUser').get('jwt'),
          'Accept': 'application/vnd.api+json'
        }
      }).then(function(response) {
        if (response.ok) {
          if (response.status == 204 ) {
            return "No URL found";
          }

          return response.json().then(function(data) {
            if (data.errors) {
              let message = data.errors[0].title;
              return message;
            } else {
              self.set('url', data.url);
              self.get('model').set('url', data.url);
            }
          });
        } else {
          if (console.debug) {
            console.debug(response);
          } else {
            console.log(response);
          }
        }
      }).catch(function(error) {
        if (console.debug) {
          console.debug(error);
        } else {
          console.log(error);
        }
      });
    }
  }
});
