import JSONSerializer from '@ember-data/serializer/json';
import { isBlank, typeOf } from '@ember/utils';

export default JSONSerializer.extend({
  serialize(snapshot) {
    let json = {};

    snapshot.eachAttribute((key) => {
      json[key] = snapshot.attr(key);
    });

    Object.keys(json).forEach((key) => {
      if (Object.keys(this.filterNull(json[key])).length === 0) {
        delete json[key];
      } else {
        json[key] = this.filterNull(json[key]);
        if (typeOf(json[key]) == 'array') {
          json[key] = json[key].filter((item) => { return Object.keys(item).length > 0})
        }
      }
    });

    return json;
  },
  filterNull(snapshot) {
    if (isBlank(snapshot)) {
      return {};
    }

    if (typeOf(snapshot) === 'string') {
      return snapshot;
    }

    if (typeOf(snapshot) === 'array') {
      if (snapshot.length > 0) {
        return snapshot.map((item) => this.filterNull(item))
      }
      else {
        return {}
      }
    }

    let json = {
      id: snapshot.id,
    };

    snapshot.eachAttribute((key) => {
      json[key] = snapshot.attr(key);
    });

    Object.keys(json).forEach((key) => isBlank(json[key]) && delete json[key]);

    return json;
  },
});

