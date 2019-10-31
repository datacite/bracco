import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  can: service(),
  features: service(),

  model() {
     var model = this.modelFor('providers/show');
     // Explicitly get the consortium here and set on the model
     // This ensures the promise is fulfilled before the template is run
     // so the data can be used in the template.
     model.set('consortium_id', model.get('consortium.id'));
     model.set('consortium_name', model.get('consortium.name'));
     return model;
  },

  afterModel(model) {
    if (this.can.cannot('read provider', model)) {
      this.transitionTo('index');
    }
  }
});
