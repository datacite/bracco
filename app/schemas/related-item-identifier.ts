import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type RelatedItemIdentifier= {
  relatedItemIdentifier: string;
  relatedItemIdentifierType: string;
  relatedMetadataScheme: string;
  schemeUri: string;
  schemeType: string;
};

export const RelatedItemIdentifierSchema: ResourceSchema = {
  identity: null,
  type: 'RelatedItemIdentifier',
  fields: [
    {
      kind: 'field',
      name: 'relatedItemIdentifier',
    },
    {
      kind: 'field',
      name: 'relatedItemIdentifierType',
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
  ]
};

////////////////////
// Register Schema
////////////////////

export function registerRelatedItemIdentifierSchema(schema: SchemaService) {
  schema.registerResources([
    RelatedItemIdentifierSchema,
  ])
};
