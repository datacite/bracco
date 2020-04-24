import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  session: service(),

  queryParams: [ 'globus' ],
  globus: null,
  orcidLogoUrl: ENV.CDN_URL + '/images/orcid.png',
  globusLogoUrl: ENV.CDN_URL + '/images/globus.png',
  oidcAuthUrl: 'http://localhost:8080/users/auth/globus', // ENV.FABRICA_URL + '/authorize',

  showGlobus: computed('globus', function() {
    return isPresent(this.globus);
  }),

  actions: {
    authenticate() {
      let { identification, password } = this;
      this.session.authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.errors && reason.errors[0].title || reason);
      });
      if (!this.get('errorMessage')) {
        this.transitionToRoute('/');
      }
    },
  },
});
