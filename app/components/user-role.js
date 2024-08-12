import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class UserRole extends Component {
  @service
  currentUser;

  init(...args) {
    super.init(...args);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }
}
