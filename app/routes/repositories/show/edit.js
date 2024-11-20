import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { clientTypeList } from 'bracco/models/repository';

export default class EditRoute extends Route {
  @service
  can;

  @service
  router;

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.get('symbol'));
    return repository;
  }

  afterModel() {
    if (
      this.can.cannot('update repository', this.modelFor('repositories/show'))
    ) {
      this.router.transitionTo('index');
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    const filteredClientTypeList =
      model.get('clientType') === 'igsnCatalog'
        ? clientTypeList.filter(function (object) {
            return object.value === 'igsnCatalog';
          })
        : clientTypeList.filter(function (object) {
            return object.value !== 'igsnCatalog';
          });

    controller.set('clientTypeList', filteredClientTypeList);
    controller.set('clientTypes', filteredClientTypeList);
  }
}
