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

  // model(params) {
  //   let self = this;
  //   return RSVP.hash({
  //     user: this.store
  //     .findRecord("user", params.user_id)
  //     .then(function(user) {
  //       set(self, "headData.title", user.name);
  //       return user;
  //     })
  //     .catch(function(reason) {
  //       if (console.debug) {
  //         console.debug(reason);
  //       } else {
  //         console.log(reason);
  //       }

  //       self
  //         .get("flashMessages")
  //         .warning(
  //           "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
  //         );
  //       self.transitionTo("/");
  //     }),
  //     // researcher: this.store
  //     // .findRecord("researcher", params.user_id)
  //     // .then(function(researcher) {
  //     //   set(self, "headData.title", researcher.name);
  //     //   return researcher;
  //     // })
  //     // .catch(function(reason) {
  //     //   if (console.debug) {
  //     //     console.debug(reason);
  //     //   } else {
  //     //     console.log(reason);
  //     //   }

  //     //   self
  //     //     .get("flashMessages")
  //     //     .warning(
  //     //       "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
  //     //     );
  //     //   self.transitionTo("/");
  //     // }),
  //       researcher: request('https://api.datacite.org/graphql/', query)
  //           .then(data =>
  //           console.log(data))
          // },


    // model(params) {
    //   let self = this;
    //   return new RSVP.Promise(function(resolve, reject) {
    //     RSVP.all([ 
    //       this.store
    //       .findRecord("user", params.user_id)
    //       .then(function(user) {
    //         set(self, "headData.title", user.name);
    //         return user;
    //       })
    //       .catch(function(reason) {
    //         if (console.debug) {
    //           console.debug(reason);
    //         } else {
    //           console.log(reason);
    //         }

    //         self
    //           .get("flashMessages")
    //           .warning(
    //             "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
    //           );
    //         self.transitionTo("/");
    //       }), 
    //       request('https://api.datacite.org/client-api/graphql', query)
    //         .then(function(researcher) {
    //           return researcher;
    //         })
    //         .catch(function(reason) {
    //           if (console.debug) {
    //             console.debug(reason);
    //           } else {
    //             console.log(reason);
    //           }

    //           self
    //             .get("flashMessages")
    //             .warning(
    //               "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
    //             );
    //           self.transitionTo("/");
    //         }),
    //     ])
    //     .then(function([ hashA, hashB ]) {
    //       resolve(this.merge(hashA, hashB));
    //     })
    //     .catch(reject);
    //   });
    // },
      
      
      
      
      // model(params) {
      //   let self = this;
      //   return  RSVP.hash({
      //     user: this.store
      //     .findRecord("user", params.user_id)
      //     .then(function(user) {
      //       set(self, "headData.title", user.name);
      //       console.log(user)

      //       return user;
      //     })
      //     .catch(function(reason) {
      //       if (console.debug) {
      //         console.debug(reason);
      //       } else {
      //         console.log(reason);
      //       }

      //       self
      //         .get("flashMessages")
      //         .warning(
      //           "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
      //         );
      //       self.transitionTo("/");
      //     }),
          
      //     researcher: request('https://api.datacite.org/client-api/graphql', query)
      //     .then(function(researcher) {
      //       console.log(researcher)
      //       return researcher;
      //     })
      //     .catch(function(reason) {
      //       if (console.debug) {
      //         console.debug(reason);
      //       } else {
      //         console.log(reason);
      //       }

      //       self
      //         .get("flashMessages")
      //         .warning(
      //           "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
      //         );
      //       self.transitionTo("/");
      //     }),
      //   })
      // },

    model(params) {
      let self = this;
      return this.store
        .findRecord("user", params.user_id)
        .then(function(user) {
          // console.log("ssss")

          // request('https://api.datacite.org/client-api/graphql', query)
          //   .then(data =>
          //   console.log(data))
          // console.log("Fdsfdsfdsfdsfdfds")
          set(self, "headData.title", user.name);
          return user;
        })
        .catch(function(reason) {
          if (console.debug) {
            console.debug(reason);
          } else {
            console.log(reason);
          }

          self
            .get("flashMessages")
            .warning(
              "Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question."
            );
          self.transitionTo("/");
        })
  },

  afterModel(model) {
    if (this.can.cannot("read user", model)) {
      this.transitionTo("index");
    }
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
