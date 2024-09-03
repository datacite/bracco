import classic from 'ember-classic-decorator';
import Transform from '@ember-data/serializer/transform';
import countryList from 'iso-3166-country-list';

@classic
export default class Country extends Transform {
  deserialize(serialized) {
    if (serialized) {
      return { code: serialized, name: countryList.name(serialized) };
    } else {
      return null;
    }
  }

  serialize(deserialized) {
    if (deserialized) {
      return deserialized.code;
    } else {
      return null;
    }
  }
}
