import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(snapshot) {
    let json = this._super(...arguments);

    // don't send back these attributes if file upload form is used
    if (snapshot.attr('mode') === 'modify') {
      delete json.data.attributes.creators;
      delete json.data.attributes.titles;
      delete json.data.attributes.description;
      delete json.data.attributes.publisher;
      delete json.data.attributes.publicationYear;
      delete json.data.attributes.types;
    }

    return json;
  },
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
  keyForRelationship(key) {
    if (key === 'repository') {
      return 'client';
    } else {
      return this._super(...arguments);
    }
  },
  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    payload.data.attributes.meta = payload.meta || {};

    return this._super.apply(this, arguments);
  }
});
