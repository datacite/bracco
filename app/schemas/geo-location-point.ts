import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type GeoLocationPoint = {
  pointLongitude: number;
  pointLatitude: number;
};

export const GeoLocationPointSchema: ResourceSchema = {
  identity: null,
  type: 'GeoLocationPoint',
  fields: [
    {
      kind: 'field',
      name: 'pointLongitude',
    },
    {
      kind: 'field',
      name: 'pointLatitude',
    },
  ]
}

////////////////////
// Register Schema
////////////////////

export function registerGeoLocationPointSchema(schema: SchemaService) {
  schema.registerResources([
    GeoLocationPointSchema,
  ])
};
