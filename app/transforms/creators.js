import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {

    if (Ember.typeOf(serialized) === 'array') {
      return serialized;
    } else if (Ember.typeOf(serialized) === 'object') {
      return [serialized];
    } else {
      return [];
    }
  },

  serialize(deserialized) {
    if (Ember.typeOf(deserialized) === 'array') {
      return deserialized;
    } else {
      return [];
    }
  }
});
