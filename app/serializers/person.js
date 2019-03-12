import { underscore } from '@ember/string';
// import { assign } from '@ember/polyfills';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // strip "https://" from id
    console.log(payload)
    payload.id  = payload.id.substr(8);
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  // normalizeFindRecordResponse(store, primaryModelClass, payload) {
  //   payload.data.attributes.meta = payload.meta || {};

  //   return this._super(store, primaryModelClass, payload);
  // },
  keyForAttribute(attr) {
    return underscore(attr);
  }
});