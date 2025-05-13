import type { SchemaService } from '@ember-data-mirror/store/types'; 
import type { DerivedField, LegacyBelongsToField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import { belongsTo } from '@ember-data-mirror/model';
import { withDefaults } from '@ember-data-mirror/model/migration-support';
// import { withDefaults } from '@warp-drive-mirror/schema-record';
import { SchemaArrayField } from '@warp-drive-mirror/core-types/schema/fields';
import ENV from 'bracco/config/environment';

import{ type Providers, registerProviderSchema } from './provider';

export type Client = Readonly<{
  id: string;
  $type: 'clients';

    provider: Readonly<LegacyBelongsToField>;
    name: string;
    alternateName: string;
    symbol: string;
    globusUuid: string;
    re3data: string;
    domains: string;
    systemEmail: string;
    salesforceId: string;
    analyticsTrackingId: string;
    year: number;
    description: string;
    url: string;
    clientType: string;
    repositoryType: string;
    software: string;
    isActive: boolean;
    hasPassword: boolean;
    mode: string;
    //isDestroyed: boolean;
    //isDestroying: boolean;

  [Type]: 'clients';
}>;

//export const ClientSchema: ResourceSchema = withDefaults({
export const ClientSchema = withDefaults({
  type: 'clients',
  legacy: true,
  fields: [
    {
      kind: 'belongsTo',
      name: 'provider',
      type: 'providers',
      options: {
        async: true,
        //linksMode: true,
        inverse: null,
      }
    },
    {
      kind: 'field',
      name: 'name',
    },
    {
      kind: 'field',
      name: 'alternateName',
    },
    {
      kind: 'field',
      name: 'symbol',
    },
    {
      kind: 'field',
      name: 'globusUuid',
    },
    {
      kind: 'field',
      name: 're3data',
    },
    {
      kind: 'field',
      name: 'domains',
    },
    {
      kind: 'field',
      name: 'systemEmail',
    },
    {
      kind: 'field',
      name: 'salesforceId',
    },
    {
      kind: 'field',
      name: 'analyticsTrackingId',
    },
    {
      kind: 'field',
      name: 'year',
    },
    {
      kind: 'field',
      name: 'description',
    },
    {
      kind: 'field',
      name: 'url',
    },
    {
      kind: 'field',
      name: 'clientType',
    },
    {
      kind: 'field',
      name: 'repositoryType',
    },
    {
      kind: 'field',
      name: 'software',
    },
    {
      kind: 'field',
      name: 'isActive',
    },
    {
      kind: 'field',
      name: 'hasPassword',
    },
    {
      kind: 'field',
      name: 'mode',
    },
    {
      kind: 'field',
      name: 'isDestroyed',
    },
    {
      kind: 'field',
      name: 'isDestroying',
    }
  ]
});

//////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the schema on creation of the schema service (in the store)
//////////////////////////////////////////////////////////////////////////////////////////

export function registerClientSchema(schema: SchemaService) {
  registerProviderSchema(schema);

  schema.registerResources([
    ClientSchema,
  ])
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the derivations on creation of the schema service (in the store)
///////////////////////////////////////////////////////////////////////////////////////////////

export function registerClientDerivations(schema: SchemaService) {

}
