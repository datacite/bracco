import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class DeleteController extends Controller {
  @service
  store;

  @service
  router;

  repositoryId = null;

  @action
  destroyAction() {
    let self = this;
    let repositoryId = this.model.get('repository.id');
    this.store
      .findRecord('doi', this.model.get('id'), { backgroundReload: false })
      .then(function (doi) {
        doi.destroyRecord().then(function () {
          self.router.transitionTo('repositories.show.dois', repositoryId);
        });
      })
      .catch(function (reason) {
        console.debug(reason);
      });
  }

  @action
  cancelAction() {
    this.router.transitionTo('dois.show', this.model);
  }
}
