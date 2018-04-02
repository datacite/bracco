import DS from 'ember-data';
import countryList from 'npm:iso-3166-country-list';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      return { code: serialized, name: countryList.name(serialized) };
    } else {
      return null;
    }
  },

  serialize(deserialized) {
    if (deserialized) {
      return deserialized.code;
    } else {
      return null;
    }
  }
});
