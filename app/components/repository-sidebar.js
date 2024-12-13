// Finish conversion of this component to a @glimmer component.
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classNames('panel', 'facets', 'add')
export default class RepositorySidebar extends Component {
  @service
  currentUser;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.currentUser = this.currentUser;

  }
}
