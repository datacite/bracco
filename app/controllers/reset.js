import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'bracco/config/environment';

export default class ResetController extends Controller {
  @service
  session;

  requestSent = false;
  errorMessage = null;

  @action
  sendLink() {
    this.set('requestSent', false);
    let { identification } = this;
    let self = this;
    let url = ENV.API_URL + '/reset';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username=' + identification
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (data.message === 'Queued. Thank you.') {
              self.set('requestSent', true);
            } else {
              self.set('errorMessage', data.message);
            }
          });
        } else {
          console.debug(response);
        }
      })
      .catch(function (reason) {
        self.set(
          'errorMessage',
          (reason.errors && reason.errors[0].title) || JSON.stringify(reason)
        );
      });
  }
}
