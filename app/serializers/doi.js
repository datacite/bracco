import DS from "ember-data";

export default DS.JSONAPISerializer.extend({
  attrs: {
    // reserved attribute names
    breason: { key: 'reason' },
    bcontainer: { key: 'container', serialize: false },

    // don't send back these attributes, as updates are not implemented yet
    identifiers: { serialize: false },
    contentUrl: { serialize: false },
    subjects: { serialize: false },
    contributors: { serialize: false },
    dates: { serialize: false },
    language: { serialize: false },
    relatedIdentifiers: { serialize: false },
    sizes: { serialize: false },
    formats: { serialize: false },
    version: { serialize: false },
    rightsList: { serialize: false },
    geoLocations: { serialize: false },
    fundingReferences: { serialize: false },
    landingPage: { serialize: false },
    schemaVersion: { serialize: false },

    // don't send back these attributes, as they are managed by the API
    prefix: { serialize: false },
    suffix: { serialize: false },
    metadataVersion: { serialize: false },
    created: { serialize: false },
    registered: { serialize: false },
    updated: { serialize: false },
    isActive: { serialize: false }
  },
  keyForAttribute(key) {
    return key;
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});
