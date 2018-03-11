import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (Ember.typeOf(serialized) === 'array') {
      this.deserialize(serialized[0]);
    } else if (Ember.typeOf(serialized) === 'object') {
      return serialized.text;
    } else {
      return serialized;
    }
  },

  serialize(deserialized) {
    return deserialized;
  }
});
