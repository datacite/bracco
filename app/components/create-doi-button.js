import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@classNames('')
export default class CreateDoiButton extends Component {
  @service
  currentUser;

  @service
  router;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    this.set('currentUser', this.currentUser);
  }

  @action
  createDoi() {
    this.router.transitionTo('repositories.show.dois.new');
  }
}
