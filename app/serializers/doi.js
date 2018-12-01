import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  attrs: {
    // don't send back these attributes, as they are managed by the API
    landingPage: { serialize: false },
    metadataVersion: { serialize: false },
    created: { serialize: false },
    registered: { serialize: false },
    updated: { serialize: false }
  },
  keyForAttribute(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});