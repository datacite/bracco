import classic from 'ember-classic-decorator';
import JSONSerializer from '@ember-data/serializer/json';
import { isBlank, typeOf } from '@ember/utils';

@classic
export default class GeoLocation extends JSONSerializer {
  serialize(snapshot) {
    let json = {};

    snapshot.eachAttribute((key) => {
      json[key] = snapshot.attr(key);
    });

    Object.keys(json).forEach((key) => {
      if (Object.keys(this.filterNull(json[key], key)).length === 0) {
        delete json[key];
      } else {
        json[key] = this.filterNull(json[key], key);
      }
    });

    return json;
  }

  filterNull(snapshot, key) {
    if (isBlank(snapshot)) {
      return {};
    }
    if ( 
      typeOf(snapshot) === 'string' ||
      (snapshot.constructor.name === 'Array' && key === 'geoLocationPolygon')
    ) {
      return snapshot;
    }

    let json = {
      id: snapshot.id
    };

    snapshot.eachAttribute((key) => {
      json[key] = snapshot.attr(key);
    });

    Object.keys(json).forEach((key) => isBlank(json[key]) && delete json[key]);

    return json;
  }
}
