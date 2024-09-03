import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class LandingPage extends Component {
  @service
  flashMessages;
}
