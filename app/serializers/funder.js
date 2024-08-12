import classic from 'ember-classic-decorator';
import JSONSerializer from '@ember-data/serializer/json';
import { underscore } from '@ember/string';

@classic
export default class Funder extends JSONSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let total = payload.message.total_results;
    let totalPages = Math.min(Math.ceil(total / 20), 500);
    let meta = { meta: { total, totalPages } };
    payload = payload.message.items.map((item) => {
      item.id = '10.13039/' + item.id;
      return item;
    });
    let data = super.normalizeArrayResponse(store, primaryModelClass, payload, id, requestType);
    return Object.assign(data, meta);
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // add DOI prefix
    payload.id = '10.13039/' + payload.message.id;
    return super.normalizeSingleResponse(store, primaryModelClass, payload, id, requestType);
  }

  keyForAttribute(attr) {
    return underscore(attr);
  }
}
