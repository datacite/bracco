import type { SchemaService } from '@ember-data-mirror/store/types'; 
import type { DerivedField, LegacyBelongsToField, ResourceSchema, SchemaArrayField } from '@warp-drive-mirror/core-types/schema/fields';
import { Type } from '@warp-drive-mirror/core-types/symbols';
import {registerDerivations, withDefaults } from '@ember-data-mirror/model/migration-support';

export type Repositories = Readonly<{
  id: string;
  $type: 'repositories';

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

  [Type]: 'repositories';
}>;

export const RepositorySchema: ResourceSchema = withDefaults({
  identity: null,
  type: 'repositories',
  legacy: true,
  fields: [
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
  ]
});

//////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the schema on creation of the schema service (in the store)
//////////////////////////////////////////////////////////////////////////////////////////

export function registerRepositorySchema(schema: SchemaService) {
  schema.registerResources([
    RepositorySchema,
  ])
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Helper function to register the derivations on creation of the schema service (in the store)
///////////////////////////////////////////////////////////////////////////////////////////////

export function registerRepositoryDerivations(schema: SchemaService) {

}
