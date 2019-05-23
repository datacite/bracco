import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serializeAttribute(snapshot, json, key) {
    // Don't try and send null field contact details to the API
    if(snapshot.attr(key) != null) {
      this._super(...arguments);
    }
  }
});
