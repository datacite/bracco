// Finish conversion of this component to a @glimmer component.
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class UrlCheck extends Component {
  @service
  currentUser;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // ??? - doesn't make sense
    // this.set('url', this.url);
  }
}
