import { typeOf } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {

    if (typeOf(serialized) === 'array') {
      return serialized;
    } else if (typeOf(serialized) === 'object') {
      return [serialized];
    } else {
      return [];
    }
  },

  serialize(deserialized) {
    if (typeOf(deserialized) === 'array') {
      return deserialized;
    } else {
      return [];
    }
  }
});
