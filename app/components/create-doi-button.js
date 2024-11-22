// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@classNames('')
export default class CreateDoiButton extends Component {
  @service
  currentUser;

  @service
  router;

  @action
  createDoi() {
    this.router.transitionTo('repositories.show.dois.new');
  }
}
