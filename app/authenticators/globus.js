import Base from 'ember-simple-auth/authenticators/base';
import { Promise } from 'rsvp';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { isEmpty } from '@ember/utils';

export default Base.extend({
  serverTokenEndpoint: ENV.API_URL + '/oidc-token',

  restore(data) {
    return this._validate(data) ? Promise.resolve(data) : Promise.reject();
  },
  authenticate(jwt) {
    return new Promise((resolve, reject) => {
      const serverTokenEndpoint = this.serverTokenEndpoint;

      fetch(serverTokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'token=' + jwt,
      }).then((response) => {
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
      }).catch(reject);
    });
  },
  invalidate() {
    return Promise.resolve();
  },
  _validate(data) {
    return !isEmpty(data.access_token);
  },
});
