import { typeOf } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (typeOf(serialized) === 'array') {
      return this.deserialize(serialized[0]);
    } else if (typeOf(serialized) === 'object') {
      return serialized.text;
    } else {
      return serialized;
    }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
