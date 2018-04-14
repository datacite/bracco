import Ember from 'ember';
const { service } = Ember.inject;
import BaseValidator from 'ember-cp-validations/validators/base';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';

const metadata = BaseValidator.extend({
  currentUser: service(),

  validate(value, options, model) {
    console.log(value)
    if (!value && options.allowBlank) {
      return true;
    } else {
      let xml = this.b64EncodeUnicode(value);
      let url = ENV.APP_URL + '/dois/validate';
      return fetch(url, {
        method: 'post',
        headers: {
          'authorization': 'Bearer ' + this.get('currentUser').get('jwt'),
          'content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          data: {
            type: 'dois',
            attributes: {
              doi: this.get(options.dependentKeys[0]),
              xml: xml
            },
            relationships: {
              client: {
                data: {
                  type: "clients",
                  id: this.get('currentUser').get('client_id')
                }
              }
            }
          }
        })
      }).then(function(response) {
        if (response.ok) {
          return response.json().then(function(data) {
            if (data.errors) {
              let title = data.errors[0].title;
              let message = title.slice(title.indexOf(' '), title.length);
              return message;
            } else {
              return true;
            }
          });
        } else {
          Ember.Logger.assert(false, response);
        }
      }).catch(function(error) {
        Ember.Logger.assert(false, error);
      });
    }
  },
  b64EncodeUnicode(str) {
      // first we use encodeURIComponent to get percent-encoded UTF-8,
      // then we convert the percent encodings into raw bytes which
      // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
      }));
  }
});

metadata.reopenClass({
  getDependentsFor() {
    return ['xml'];
  }
});

export default metadata;
