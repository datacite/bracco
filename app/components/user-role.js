// Finish conversion of this component to a @glimmer component.
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class UserRole extends Component {
  @service
  currentUser;

  constructor(...args) {
    super(...args);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }
}
