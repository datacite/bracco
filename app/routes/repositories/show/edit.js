import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { clientTypeList } from 'bracco/models/repository';

export default Route.extend({
  can: service(),

  model() {
    let repository = this.modelFor('repositories/show');
    repository.set('confirmSymbol', repository.get('symbol'));
    return repository;
  },

  afterModel() {
    if (this.can.cannot('update repository', this.modelFor('repositories/show'))) {
      this.transitionTo('index');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

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
});
