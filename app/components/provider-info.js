// Finish conversion of this component to a @glimmer component.
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { Promise } from 'rsvp';
import ENV from 'bracco/config/environment';
import { tracked } from '@glimmer/tracking';

export default class ProviderInfo extends Component {
  json = null;

  @service
  flashMessages;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let promise = new Promise((resolve, reject) => {
      const url = ENV.API_URL + '/providers/' + (this.model ? this.model.id : '') + '/stats';
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
        if (self.isDestroying || self.isDestroyed) {
          return;
        }
        self.json = value;
      },
      function (reason) {
        console.debug(reason);
      }
    );
  }
}
