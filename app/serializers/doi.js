import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  attrs: {
    // don't send back this attribute
    landingPage: { serialize: false }
  },
  keyForAttribute(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});