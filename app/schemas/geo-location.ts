import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';
import { type GeoLocationBox, registerGeoLocationBoxSchema } from './geo-location-box';
import { type GeoLocationPoint, registerGeoLocationPointSchema } from './geo-location-point';

export type GeoLocation = {
  geoLocationPlace: string;
  geoLocationPoint: Readonly<GeoLocationPoint>;
  geoLocationBox: Readonly<GeoLocationBox>;
};

export const GeoLocationSchema: ResourceSchema = {
  identity: null,
  type: 'GeoLocation',
  fields: [
    {
      kind: 'field',
      name: 'geoLocationPlace',
    },
    {
      kind: 'schema-object',
      name: 'geoLocationPoint',
      type: 'GeoLocationPoint',
    },
    {
      kind: 'schema-object',
      name: 'geoLocationBox',
      type: 'GeoLocationBox',
    },
  ]
}

////////////////////
// Register Schemas
////////////////////

export function registerGeoLocationSchema(schema: SchemaService) {
  registerGeoLocationPointSchema(schema);
  registerGeoLocationBoxSchema(schema);

  schema.registerResources([
    GeoLocationSchema,
  ])
};
