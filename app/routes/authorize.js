import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  beforeModel() {
    let self = this;
    let url = ENV.FABRICA_URL + '/authorize';
    fetch(url).then(function (response) {
      if (response.ok) {
        let jwt = response.headers.get('x-amzn-oidc-data');
        self.session.authenticate('authenticator:globus', jwt).catch((reason) => {
          self.set('errorMessage', reason.errors && reason.errors[0].title || reason);
          self.transitionTo('/');
        });
      } else {
        console.log(response);
        self.transitionTo('/');
      }
    }).catch(function (error) {
      console.log(error);
      this.transitionTo('/');
    });
  }
});