import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
// import { queryManager } from 'ember-apollo-client';
// import query from 'bracco/gql/queries/researcher.graphql';
import { hash, all } from 'rsvp';
import { merge } from '@ember/polyfills';

export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),
  // apollo: queryManager(),

  // beforeModel(params) {
  //   console.log(params);
  //   // this.metrics(params);
  // },

  model(params) {

    let self = this;
    // let variables = { id: `http://orcid.org/${params.user_id}` };

    let parameters = {
      'user-id': `http://orcid.org/${params.user_id}`,
      'mix-in': 'metrics',
    };

    // return  hash({
    //   user: this.store.findRecord('user', params.user_id).then(function(user) {
    //     set(self, 'headData.title', user.name);
    //     return user;
    //   }).catch(function(reason) {
    //     console.debug(reason);

    //     self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
    //     self.transitionTo('/');
    //   }),
    //   metrics: this.store.query('doi', parameters).then(function(result) {
    //     return result.meta;
    //   }).catch(error => console.log(error)),
    // });

    return new Promise(function(resolve, reject) {
      all([
        self.store.findRecord('user', params.user_id).then(function(user) {
          set(self, 'headData.title', user.name);
          return user;
        }).catch(function(reason) {
          console.debug(reason);

          self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
          self.transitionTo('/');
        }),
        self.store.query('doi', parameters).then(function(result) {
          
          // return result.meta.citations;
          return {
            citations: 123,
            downloads: 1,
            views: 11,
          };
        }).catch(error => console.log(error)) ])
        .then(function([ hashA, hashB ]) {
          resolve(merge(hashA, hashB));
        })
        .catch(reject);
    });
  },

  // metrics(parameters) {
  //   return this.store.query('doi', parameters).then(function(result) {
  //     return result.meta;
  //   }).catch(error => console.log(error));
  // },

  afterModel(model) {
    if (this.can.cannot('read user', model)) {
      this.transitionTo('index');
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
  },
});
