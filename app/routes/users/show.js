import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { set } from "@ember/object";
import RSVP from 'rsvp';
// import fetch from 'fetch';
import { request, GraphQLClient } from 'graphql-request'

const query = `{
  person(id: "https://orcid.org/0000-0002-8862-1404") {
    givenName
    familyName
    orcid: id
    citationCount
    viewCount
    downloadCount
  }
}`




export default Route.extend({
  can: service(),
  features: service(),
  headData: service(),

  model(params) {
    let self = this;
    return this.store.findRecord('user', params.user_id).then(function(user) {
      set(self, 'headData.title', user.name);
      return user;
    }).catch(function(reason) {
      console.debug(reason);

      self.get('flashMessages').warning('Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      self.transitionTo('/');
    });
  },

  afterModel(model) {
    if (this.can.cannot("read user", model)) {
      this.transitionTo("index");
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    },
  },
});
