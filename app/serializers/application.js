import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});