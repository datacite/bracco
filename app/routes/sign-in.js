import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class SignInRoute extends Route {
  @service
  session;

  beforeModel(transition) {
    this.session.prohibitAuthentication('index');
  }
}
