// Finish conversion of this component to a @glimmer component.
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class LandingPage extends Component {
  @service
  flashMessages;
}
