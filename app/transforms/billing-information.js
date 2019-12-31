import Transform from '@ember-data/serializer/transform';
import countryList from 'iso-3166-country-list';

export default Transform.extend({
  deserialize(serialized) {
    if (serialized) {

      return {
        city: serialized.city ? serialized.city : "",
        state: serialized.state,
        postCode: serialized.postCode,
        department: serialized.department,
        address: serialized.address,
        organization: serialized.organization,
        country: serialized.country ? {code: serialized.country, name: countryList.name(serialized.country)} : ""
      };
    } else {
      return null;
    }
  },

  serialize(deserialized) {
    if (deserialized) {
      return  {
        city: deserialized.city,
        state: deserialized.state,
        address: deserialized.address,
        postCode: deserialized.postCode,
        department: deserialized.department,
        organization: deserialized.organization,
        country: deserialized.country ? deserialized.country.code : ""
      };
    } else {
      return null;
    }
  }
});
