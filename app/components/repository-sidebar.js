import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@classNames('panel', 'facets', 'add')
export default class RepositorySidebar extends Component {
  @service
  currentUser;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.set('currentUser', this.currentUser);
  }
}
