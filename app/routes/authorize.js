import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  fastboot: service(),

  model() {
    // force fastboot
    if(this.get('fastboot.isFastBoot')) {
      let headers = this.get('fastboot.request.headers');
      let jwt = headers.get('x-amzn-oidc-data');
      if (jwt) {
        let self = this;
        this.session.authenticate('authenticator:globus', jwt).catch((reason) => {
          self.set('errorMessage', reason.errors && reason.errors[0].title || reason);
          self.transitionTo('/');
        });
      } else {
        this.transitionTo('/sign-in?globus');
      }
    } else {
      this.transitionTo('/sign-in');
    }
  }
});