import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    
    if (Ember.typeOf(serialized) === 'array') {
      return JSON.stringify(serialized); 
    } else if (Ember.typeOf(serialized) === 'object') {
      return JSON.stringify([serialized]); 
    } else {
      return JSON.stringify([]);
    }
  },

  serialize(deserialized) {
    if (deserialized) {
      return JSON.parse(deserialized);
    } else {
      return [];
    }
  }
});
