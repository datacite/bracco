import JSONAPICache from '@ember-data-mirror/json-api';
import RequestManager from '@ember-data-mirror/request';
import Fetch from '@ember-data-mirror/request/fetch';
import { CachePolicy } from '@ember-data-mirror/request-utils';
import {
  instantiateRecord,
  teardownRecord
} from '@warp-drive-mirror/schema-record/hooks';
import {
  registerDerivations,
  SchemaService
} from '@warp-drive-mirror/schema-record/schema';
import WarpDriveStore, { CacheHandler } from '@ember-data-mirror/store';
import { registerDoiSchema, registerDoiDerivations } from '../schemas/doi';

export default class v2Store extends WarpDriveStore {
  requestManager = new RequestManager().use([Fetch]).useCache(CacheHandler);

  lifetimes = new CachePolicy({
    apiCacheHardExpires: 120 * 1000,
    apiCacheSoftExpires: 60 * 1000
  });

  createSchemaService() {
    const schema = new SchemaService();

    registerDoiSchema(schema);
    registerDoiDerivations(schema);
    registerDerivations(schema);
    //debugger
    console.log("GOT HERE - CREATING SCHEMA")
    return schema;
  }

  createCache(capabilities) {
    return new JSONAPICache(capabilities);
  }

  instantiateRecord(identifier, createArgs) {
    return instantiateRecord(this, identifier, createArgs);
  }

  teardownRecord(record) {
    return teardownRecord(record);
  }
}
