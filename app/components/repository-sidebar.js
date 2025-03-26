import Component from '@glimmer/component';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';

@classNames('panel', 'facets', 'add')
export default class RepositorySidebar extends Component {
  @service currentUser;
}
