import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { isBlank } from '@ember/utils';

export default class EditRoute extends Route {
  @service
  can;

  @service
  flashMessages;

  @service
  router;

  @service
  store;

  model() {
    let self = this;
    let id = this.modelFor('dois/show').get('id');
    return this.store
      .findRecord('doi', id, {
        include: 'client',
        adapterOptions: {
          affiliation: true,
          publisher: true
        }
      })
      .then(function (doi) {
        if (
          isBlank(doi.schemaVersion) ||
          !doi.schemaVersion.endsWith('kernel-4')
        ) {
          self
            .get('flashMessages')
            .warning(
              'Using the Form would update this DOI to the latest schema version.',
              { destroyOnClick: false }
            );
        }
        if (!doi.publisher) {
          doi.publisher = {};
        }
        return doi;
      })
      .catch(function (reason) {
        console.debug(reason);

        self.get('flashMessages').warning(reason);
        self.router.transitionTo('/');
      });
  }

  afterModel() {
    if (this.can.cannot('delete doi', this.modelFor('dois/show'))) {
      this.router.transitionTo('index');
    } else {
      this.modelFor('dois/show').set('mode', 'edit');
    }
  }
}
