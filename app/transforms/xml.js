import DS from 'ember-data';
import vkbeautify from 'npm:vkbeautify';

export default DS.Transform.extend({
  deserialize(serialized) {
    let xml = atob(serialized);
    return ["<hsh></hsh>", "ée"].includes(xml) ? '' : vkbeautify.xml(xml);
  },

  serialize(deserialized) {
    let xml = (deserialized) ? vkbeautify.xml(deserialized) : vkbeautify.xml('<hsh></hsh>');
    return btoa(xml);
  }
});
