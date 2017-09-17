import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload.data.attributes.meta = payload.meta || {};
    return this._super.apply(this, arguments);
  }
});
