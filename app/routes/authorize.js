import Route from '@ember/routing/route';
import fetch from 'fetch';
import ENV from 'bracco/config/environment';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  router: service(),

  model() {
    let self = this;
    let url = ENV.FABRICA_URL + '/authorize';
    fetch(url)
      .then(function (response) {
        let jwt = response.headers.get('x-amzn-oidc-data');

        if (jwt) {
          console.log(jwt);
          self.session
            .authenticate('authenticator:globus', jwt)
            .catch((reason) => {
              self.set(
                'errorMessage',
                (reason.errors && reason.errors[0].title) || reason
              );
              self.router.transitionTo('/');
            });
        } else {
          if (self.isDestroying || self.isDestroyed) {
            return;
          }
          console.log(response);
          self.router.transitionTo('/sign-in?globus');
        }
      })
      .catch(function (error) {
        console.log(error);
        this.router.transitionTo('/sign-in?globus');
      });
  }
});
