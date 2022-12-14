import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import { set } from '@ember/object';

export default Route.extend({
  can: service(),

  model(params) {
    // let self = this;
    return this.store
      .findRecord('doi', params.doi_id, {
        include: 'client',
        adapterOptions: {
          affiliation: true
        }
      })
      .then(function (doi) {
        // TODO fix metadata injection
        // set(self, 'headData.title', doi.titles[0].title);
        // if (doi.descriptions) {
        //   set(self, 'headData.description', doi.descriptions[0].description);
        // }
        return doi;
      })
      .catch(function (reason) {
        console.debug(reason);
        return null;
      });
  }

  // afterModel(model) {
  //   if (this.get('can').cannot('view doi', model)) {
  //     return this.transitionTo('index');
  //   }
  // }
});
