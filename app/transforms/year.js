import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      return serialized.substring(0, 4);
    } else {
      return null;
    }
  },

  serialize(deserialized) {
    return deserialized;
  }
});