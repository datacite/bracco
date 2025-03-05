import type { DerivedField, ResourceSchema } from '@warp-drive-mirror/core-types/schema/fields';
import type { SchemaService } from '@ember-data-mirror/store/types';

export type AlternateIdentifier = {
  alternateIdentifier: string;
  alternateIdentifierType: string;
}

export const AlternateIdentifierSchema: ResourceSchema = {
  identity: null,
  type: 'AlternateIdentifier',
  fields: [
    {
      kind: 'field',
      name: 'alternateIdentifier',
    },
    {
      kind: 'field',
      name: 'alternateIdentifierType',
    },
  ],
};

////////////////////
// Register Schema
////////////////////

export function registerAlternateIdentifierSchema(schema: SchemaService) {
  schema.registerResources([
    AlternateIdentifierSchema
  ])
};
