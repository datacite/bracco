import DS from "ember-data";

const keysMappingForSerialization = {
  'repository': 'client'
};

const keysMappingForNormalization = {
  'clients': 'repositories'
};

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  keyForRelationship(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  },
  payloadKeyFromModelName(key) {
    if (keysMappingForSerialization[key]) {
      return this._super(keysMappingForSerialization[key]);
    } else {
      return this._super(...arguments);
    }
  },
  modelNameFromPayloadKey(modelName) {
    if (keysMappingForNormalization[modelName]) {
      return this._super(keysMappingForNormalization[modelName]);
    } else {
      return this._super(...arguments);
    }
  }
});
