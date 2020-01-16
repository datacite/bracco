import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import query from 'bracco/gql/queries/researcher.graphql';
import { hash } from 'rsvp';


export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),
  apollo: queryManager(),


  model(params) {

    let self = this;
    let variables = { id: `http://orcid.org/${params.user_id}` };

    return hash({
      user: this.store.findRecord('user', params.user_id).then(function(user) {
        set(self, 'headData.title', user.name);
        return user;
      }).catch(function(reason) {
        console.debug(reason);

        self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
        self.transitionTo('/');
      }),
      researcher: this.apollo.query({ query, variables }, 'person')
        .then(result => {
          return result;
        })
        .catch(error => console.log(error)),

    });
  },

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
