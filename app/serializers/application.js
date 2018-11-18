import { camelize } from '@ember/string';
import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return camelize(attr);
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});
