import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'bracco/config/environment';
import { isPresent } from '@ember/utils';
import reasonUtil from '../utils/reason-util';

@classic
export default class SignInController extends Controller {
  @service
  session;

  @service
  router;

  queryParams = ['globus'];
  globus = null;
  orcidLogoUrl = ENV.CDN_URL + '/images/orcid.png';
  globusLogoUrl = ENV.CDN_URL + '/images/globus.png';
  oidcAuthUrl = 'http://localhost:8080/users/auth/globus'; // ENV.FABRICA_URL + '/authorize',

  @computed('globus')
  get showGlobus() {
    return isPresent(this.globus);
  }

  @action
  authenticate() {
    let self = this;
    let { identification, password } = this;
    this.session
      .authenticate('authenticator:oauth2', identification, password)
      .then(() => {
        self.router.transitionTo('/');
      })
      .catch((reason) => {
        this.set(
          'errorMessage',
          reasonUtil(reason, { default: 'Error logging in.' })
        );
      });
  }
}
