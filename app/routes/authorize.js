import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'bracco/config/environment';

export default class AuthorizeRoute extends Route {
  @service
  session;

  @service
  router;

  model() {
    let self = this;
    let url = ENV.FABRICA_URL + '/authorize';
    fetch(url)
      .then(function (response) {
        let jwt = response.headers.get('x-amzn-oidc-data');

        if (jwt) {
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
}
