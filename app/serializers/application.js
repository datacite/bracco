import JSONAPISerializer from '@ember-data/serializer/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  },
  modelNameFromPayloadKey(modelName) {
    if (modelName === 'clients') {
      return this._super('repositories');
    } else {
      return this._super(...arguments);
    }
  },
});
