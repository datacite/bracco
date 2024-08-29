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
    let providerId = this.model.get('provider.id');
    this.store
      .findRecord('contact', this.model.get('id'), {
        backgroundReload: false
      })
      .then(function (contact) {
        contact
          .destroyRecord()
          .then(function () {
            // We need a timeout because of ElasticSearch indexing
            setTimeout(() => {
              self.router.transitionTo('providers.show.contacts', providerId);
            }, 3600);
          })
          .catch(function (reason) {
            console.debug(reason);
          });
      });
  }

  @action
  cancelAction() {
    this.model.rollbackAttributes();
    this.model.set('confirmDelete', null);
    this.router.transitionTo('contacts.show', this.model);
  }
}
