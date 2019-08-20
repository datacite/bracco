import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  queryParams: ['globus'],
  globus: null,

  session: service(),
  orcidLogoUrl: ENV.CDN_URL + '/images/orcid.png',
  globusLogoUrl: ENV.CDN_URL + '/images/globus.png',
  oidcAuthUrl: ENV.API_URL + '/oidc-token',

  showGlobus: computed('globus', function() {
    return isPresent(this.globus);
  }),

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
