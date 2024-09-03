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

  @action
  submitAction() {
    let self = this;
    this.store
      .findRecord('provider', this.model.get('id'), {
        backgroundReload: false
      })
      .then(function (provider) {
        provider
          .destroyRecord()
          .then(function () {
            self.router.transitionTo('providers');
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.router.transitionTo('providers.show', this.model);
  }
}
