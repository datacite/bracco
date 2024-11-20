import Transform from '@ember-data/serializer/transform';
import { typeOf } from '@ember/utils';

export default class Wrapped extends Transform {
  deserialize(serialized) {
    if (typeOf(serialized) === 'array') {
      return this.deserialize(serialized[0]);
    } else if (typeOf(serialized) === 'object') {
      return serialized.text;
    } else {
      return serialized;
    }
  }

  serialize(deserialized) {
    return deserialized;
  }
}
