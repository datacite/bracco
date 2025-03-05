import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type RelatedIdentifier = {
  relatedIdentifier: string;
  relatedIdentifierType: string;
  relationType: string;
  relatedMetadataScheme: string;
  schemeUri: string;
  schemeType: string;
  resourceTypeGeneral: string;
}

export const RelatedIdentifierSchema: ResourceSchema = {
  identity: null,
  type: 'RelatedIdentifier',
  fields: [
    {
      kind: 'field',
      name: 'relatedIdentifier',
    },
    {
      kind: 'field',
      name: 'relatedIdentifierType',
    },
    {
      kind: 'field',
      name: 'relationType',
    },
    {
      kind: 'field',
      name: 'relatedMetadataScheme',
    },
    {
      kind: 'field',
      name: 'schemeUri',
    },
    {
      kind: 'field',
      name: 'schemeType',
    },
    {
      kind: 'field',
      name: 'resourceTypeGeneral',
    },
  ]
};

////////////////////
// Register Schema
////////////////////

export function registerRelatedIdentifierSchema(schema: SchemaService) {
  schema.registerResources([
    RelatedIdentifierSchema
  ])
};
