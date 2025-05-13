import JSONAPICache from '@ember-data-mirror/json-api';
import RequestManager from '@ember-data-mirror/request';
import Fetch from '@ember-data-mirror/request/fetch';
import { CachePolicy } from '@ember-data-mirror/request-utils';
import {
  instantiateRecord,
  teardownRecord,
  // registerDerivations,
  SchemaService
} from '@warp-drive-mirror/schema-record';
import { registerDerivations } from '@ember-data-mirror/model/migration-support';
import WarpDriveStore, { CacheHandler } from '@ember-data-mirror/store';
import { registerDoiSchema, registerDoiDerivations } from '../schemas/doi';
import { registerRepositorySchema, registerRepositoryDerivations } from '../schemas/repository';
import { registerProviderSchema, registerProviderDerivations } from '../schemas/provider';
//import { LegacyNetworkHandler, adapterFor } from '@ember-data-mirror/legacy-compat';
import { basicLinksHandler } from '../utils/handlers';

export default class v2Store extends WarpDriveStore {
  // requestManager = new RequestManager().use([Fetch]).useCache(CacheHandler);
  // requestManager = new RequestManager().use([LegacyNetworkHandler, Fetch]).useCache(CacheHandler);
  requestManager = new RequestManager().use([basicLinksHandler, Fetch]).useCache(CacheHandler);

  lifetimes = new CachePolicy({
    apiCacheHardExpires: 120 * 1000,
    apiCacheSoftExpires: 60 * 1000
  });

  createSchemaService() {
    const schema = new SchemaService();

    registerDoiSchema(schema);
    registerRepositorySchema(schema);
    registerProviderSchema(schema);

    registerDoiDerivations(schema);
    registerRepositoryDerivations(schema);
    registerProviderDerivations(schema);

    // Is this last 'registerDerivations' necessary?
    registerDerivations(schema);

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

  adapterFor(modelName) {
    return adapterFor(modelName, true);
  }
}
