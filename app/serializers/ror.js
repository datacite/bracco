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

    payload = records.map((item) => this._normalizeRorRecord(item));

    let data = super.normalizeArrayResponse(store, primaryModelClass, payload, id, requestType);
    return Object.assign(data, meta);
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // ROR v2: 'id' still has 'https://ror.org/'
    payload.id = payload.id?.substr(8);

    payload = this._normalizeRorRecord(payload);

    return super.normalizeSingleResponse(store, primaryModelClass, payload, id, requestType);
  }

  /**
   * Normalize a single ROR record (used for both single + array responses)
   * Priority for name types: ror_display -> label -> alias -> primary -> first
   */
  _normalizeRorRecord(item) {
    if (Array.isArray(item.names) && item.names.length > 0) {
      const preferredTypes = ['ror_display', 'label', 'alias', 'primary'];
      let nameEntry = null;

      for (let t of preferredTypes) {
        nameEntry = item.names.find((n) => Array.isArray(n.types) && n.types.includes(t));
        if (nameEntry) break;
      }

      // fallback to first names entry if none of the preferred types are present
      if (!nameEntry) {
        nameEntry = item.names[0];
      }

      item.name = nameEntry?.value || item.name;
    }

    // Normalize country if nested structure present
    if (item.country && typeof item.country === 'object') {
      item.country = item.country.country_name || item.country;
    }

    // ensure arrays are at least empty arrays to avoid template errors
    item.aliases = item.aliases || [];
    item.acronyms = item.acronyms || [];
    item.links = item.links || [];

    return item;
  }

  keyForAttribute(attr) {
    return underscore(attr);
  }
}
