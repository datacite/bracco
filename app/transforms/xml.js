import DS from 'ember-data';
import vkbeautify from 'npm:vkbeautify';

export default DS.Transform.extend({
  deserialize(serialized) {
    let xml = atob(serialized);
    return (xml === '<hsh></hsh>') ? '' : vkbeautify.xml(xml);
  },

  serialize(deserialized) {
    let xml = vkbeautify.xml(deserialized);
    return btoa(xml);
  }
});
