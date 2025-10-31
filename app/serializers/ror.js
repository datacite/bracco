import classic from 'ember-classic-decorator';
import JSONSerializer from '@ember-data/serializer/json';
import { underscore } from '@ember/string';

@classic
export default class Ror extends JSONSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let total = payload.number_of_results;
    let totalPages = Math.min(Math.ceil(total / 20), 500);
    let meta = { meta: { total, totalPages } };

    // ROR v2: 'items' replaced with 'data'
    let records = payload.items || payload.data || [];

    payload = records.map((item) => {
      // ROR v2 returns 'names' as an array instead of a single 'name' string.
      // We prefer the 'label' type for the full organization name,
      // falling back to 'alias' or 'primary' if 'label' is missing.
      // This ensures we display long-form names like
      // "European Bioinformatics Institute" instead of short codes like "EBI".

      let nameEntry =
        item.names?.find((n) => n.types?.includes('ror_display')) ||
        item.names?.find((n) => n.types?.includes('alias')) ||
        item.names?.find((n) => n.types?.includes('primary')) ||
        item.names?.[0];

      item.name = nameEntry?.value || item.name;

      // Normalize country
      if (item.country && item.country.country_name) {
        item.country = item.country.country_name;
      }

      return item;
    });

    let data = super.normalizeArrayResponse(store, primaryModelClass, payload, id, requestType);
    return Object.assign(data, meta);
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // ROR v2: 'id' still has 'https://ror.org/'
    payload.id = payload.id?.substr(8);

    // Extract main label name
    let nameEntry =
      payload.names?.find((n) => n.types?.includes('label')) ||
      payload.names?.find((n) => n.types?.includes('alias')) ||
      payload.names?.find((n) => n.types?.includes('primary')) ||
      payload.names?.[0];

    payload.name = nameEntry?.value || payload.name;

    // Normalize country name
    if (payload.country && payload.country.country_name) {
      payload.country = payload.country.country_name;
    }

    return super.normalizeSingleResponse(store, primaryModelClass, payload, id, requestType);
  }

  keyForAttribute(attr) {
    return underscore(attr);
  }
}
