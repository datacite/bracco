import { inject as service } from '@ember/service';
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const metadata = BaseValidator.extend({
  currentUser: service(),

  validate(value, options, model) {
    if (!value && options.allowBlank) {
      return true;
    } else {
      let xml = this.b64EncodeUnicode(value);
      let url = ENV.API_URL + '/dois/validate';
      let repositoryId = model.get('repository').get('id');
      return fetch(url, {
        method: 'post',
        headers: {
          authorization: 'Bearer ' + this.currentUser.jwt,
          'content-type': 'application/vnd.api+json; charset=utf-8'
        },
        body: JSON.stringify({
          data: {
            type: 'dois',
            attributes: {
              doi: this.get(options.dependentKeys[0]),
              xml
            },
            relationships: {
              client: {
                data: {
                  type: 'clients',
                  id: repositoryId
                }
              }
            }
          }
        })
      })
        .then(function (response) {
          if (response.ok) {
            return response.json().then(function (data) {
              if (data.errors) {
                let message = data.errors[0].title;
                return message;
              } else {
                return true;
              }
            });
          } else {
            console.debug(response);
          }
        })
        .catch(function (error) {
          console.debug(error);
        });
    }
  },
  b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(
      encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }
      )
    );
  }
});

metadata.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default metadata;
