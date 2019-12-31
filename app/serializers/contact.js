import JSONSerializer from '@ember-data/serializer/json';
import { isEmpty } from '@ember/utils';

export default JSONSerializer.extend({
  serializeAttribute(snapshot, json, key) {
    // Don't try and send empty field contact details to the API
    if(!isEmpty(snapshot.attr(key))) {
      this._super(...arguments);
    }
  }
});
