import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
// import { set } from '@ember/object';

@classic
export default class ShowRoute extends Route {
  @service
  can;

  @service
  store;

  model(params) {
    // let self = this;
    return this.store
      .findRecord('doi', params.doi_id.toLowerCase(), {
        include: 'client',
        adapterOptions: {
          affiliation: true,
          publisher: true
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
}
