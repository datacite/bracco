import classic from 'ember-classic-decorator';
import JSONSerializer from '@ember-data/serializer/json';

export default class Person extends JSONSerializer {
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    let name = payload.person.name;

    payload = {
      id: payload['orcid-identifier'].path,
      name: name['credit-name'] ? name['credit-name'].value : null,
      givenName: name['given-names'] ? name['given-names'].value : null,
      familyName: name['family-name'] ? name['family-name'].value : null
    };

    return super.normalizeSingleResponse(store, primaryModelClass, payload, id, requestType);
  }
  // normalizeFindRecordResponse(store, primaryModelClass, payload) {
  //   payload.data.attributes.meta = payload.meta || {};

  //   return this._super(store, primaryModelClass, payload);
  // },
  // keyForAttribute(attr) {
  //   return underscore(attr);
  // }
}
