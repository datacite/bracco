import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type GeoLocationBox = {
  southBoundLatitude: number;
  northBoundLatitude: number;
  eastBoundLongitude: number;
  westBoundLongitude: number;
};

export const GeoLocationBoxSchema: ResourceSchema = {
  identity: null,
  type: 'GeoLocationBox',
  fields: [
    {
      kind: 'field',
      name: 'southBoundLatitude',
    },
    {
      kind: 'field',
      name: 'northBoundLatitude',
    },
    {
      kind: 'field',
      name: 'eastBoundLongitude',
    },
    {
      kind: 'field',
      name: 'westBoundLongitude',
    },
  ]
}

////////////////////
// Register Schemas
////////////////////

export function registerGeoLocationBoxSchema(schema: SchemaService) {
  schema.registerResources([
    GeoLocationBoxSchema,
  ])
};
