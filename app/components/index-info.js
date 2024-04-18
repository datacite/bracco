import Component from '@ember/component';
import fetch from 'fetch';
import { Promise } from 'rsvp';
import ENV from 'bracco/config/environment';
import { inject as service } from '@ember/service';

export default Component.extend({
  json: null,
  flashMessages: service(),

  didReceiveAttrs() {
    this._super(...arguments);

    let promise = new Promise((resolve, reject) => {
      const url = ENV.API_URL + '/providers/' + this.model.get('id') + '/stats';
      const headers = { Accept: 'application/json' };
      fetch(url, {
        headers
      })
        .then((response) => {
          response.text().then((text) => {
            try {
              let json = JSON.parse(text);
              if (!response.ok) {
                response.responseJSON = json;
                reject(response);
              } else {
                resolve(json);
              }
            } catch (SyntaxError) {
              response.responseText = text;
              reject(response);
            }
          });
        })
        .catch(reject);
    });

    let self = this;
    promise.then(
      function (value) {
        // Error without checking is: 'TypeError: Cannot read property 'isDestroyed' of undefined'.
        if (self.isDestroyed) {
          return;
        }

        self.set('json', value);
      },
      function (reason) {
        console.debug(reason);
      }
    );
  }
});
