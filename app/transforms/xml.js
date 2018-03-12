import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    let xml = atob(serialized);
    return ["<hsh></hsh>", "ée"].includes(xml) ? '' : xml;
  },

  serialize(deserialized) {
    let xml = (deserialized) ? deserialized : '<hsh></hsh>';
    return btoa(xml);
  }
});
