import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';

export default Controller.extend({
  session: service(),
  orcidLogoUrl: ENV.CDN_URL + '/images/orcid.png',

  actions: {
    authenticate() {
      let { identification, password } = this;
      this.session.authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.errors && reason.errors[0].title || reason);
      });
      this.transitionToRoute('/');
    }
  }
});
