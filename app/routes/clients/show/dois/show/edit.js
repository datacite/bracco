import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { CanMixin } from 'ember-can';

export default Route.extend(CanMixin, {
  model() {
    let self = this;
    return this.store.findRecord('doi', this.modelFor('clients/show/dois/show').get('id'), { include: 'provider,client,resource-type' }).then(function(doi) {
      return doi;
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }

      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel() {
    if (!this.can('delete doi', this.modelFor('clients/show/dois/show'))) {
      return this.transitionTo('index');
    } else {
      this.modelFor('clients/show/dois/show').set('mode', 'edit');
      this.modelFor('clients/show/dois/show').set('creators', this.creatorsToSeperated(this.modelFor('clients/show/dois/show').get('creators')));
    }
  },
  creatorsToSeperated(creators) {
    return creators.map(function(a) {
      if (a.familyName) {
        return [a.familyName, a.givenName].join(", ");
      } else {
        return a.name;
      }
    }).join("\n");
  }
});
