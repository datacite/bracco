// // import { Serializer } from 'ember-graphql-adapter';
// // import { singularize } from "ember-inflector";
// // import { camelize } from "@ember/string";

// // export default Serializer.extend({
// //   normalizeResponse(store, primaryModelClass, payload, id, requestType) {
// //     // hack: swap `all` root queries for appropriate ember data model name
// //     for (let key in payload.data) {
// //       // let baseModelKey = key.replace("all", "");
// //       payload.data["researcher"] =
// //         payload.data[key];
// //       delete payload.data[key];
// //     }

// //     return this._super(store, primaryModelClass, payload, id, requestType);
// //   },
// // });

// import GraphqlSerializer from './graphql';

// export default GraphqlSerializer.extend({
//     // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
//     //   console.log(store)
//     //   console.log(payload)
//     //   console.log(requestType)
//     //   // hack: swap `all` root queries for appropriate ember data model name
//     //   for (let key in payload.data) {
//     //     // let baseModelKey = key.replace("all", "");
//     //     payload.data["researcher"] =
//     //       payload.data[key];
//     //     delete payload.data[key];
//     //   }
  
//     //   return this._super(store, primaryModelClass, payload, id, requestType);
//     // },
//   });


